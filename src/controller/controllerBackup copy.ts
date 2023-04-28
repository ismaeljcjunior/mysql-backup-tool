import { PrismaClient } from '@prisma/client'
import mysql from 'mysql2'
import { exec } from 'child_process'
import { IDatabaseResultProps } from '../interfaces/interfaces'
import fs from 'fs'
import path from 'path'


const prisma = new PrismaClient()
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

export const runListDatabases = async () => {
    try {
        connection.query('SHOW DATABASES', async (error, results: IDatabaseResultProps[], fields) => {
            if (error) {
                console.error(`Erro ao listar bancos de dados: ${error.message}`)
                return
            }
            console.log('Bancos de dados disponíveis:')
            const databases = results.map(result => result.Database)
            console.log(databases)
            await createInData(databases)
            await runBackup(databases)
            connection.end()
        })
    } catch (err) {
        console.log(err)
    }
}
export const createInData = async (databases: any) => {
    try {

        const listSaveName: any = await prisma.$queryRawUnsafe(`SELECT * FROM db`)
        for (const database of databases) {
            let encontrado = false
            for (const dbSalvo of listSaveName) {
                if (database === dbSalvo.nome) {
                    encontrado = true
                    break
                }
            }
            if (!encontrado) {
                await prisma.$queryRawUnsafe(`INSERT db (nome) VALUES ('${database}');`)
            } else {
                console.log('banco ja criado', database)
            }
        }
    } catch (err) {
        console.log(err)
    }
}
export const runBackup = async (databases: any) => {
    try {
        connection.connect()

        const databases = ['db_sac', 'db_eventos_nvr']
        const date = new Date().toISOString().replace(/:/g, '-')

        const backupDir = path.join(__dirname, '..', 'backupDUMPS')

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir)
        }
        const dumpPromises = databases.map((database) => {
            const filename = path.join(backupDir, `${database}_${date}.sql`)
            return new Promise<void>((resolve, reject) => {
                exec(`mysqldump --single-transaction --quick --lock-tables=false --host=${connection.config.host} --user=${connection.config.user} --password=${connection.config.password} ${database} > ${filename}`, (error, stdout, stderr) => {
                    if (error) {
                        reject(`Erro ao gerar dump para o banco de dados ${database}: ${error.message}`)
                    } else {
                        console.log(`Dump do banco de dados ${database} gerado com sucesso`)
                        resolve()
                    }
                })
            })
        })

        Promise.all(dumpPromises)
            .then(() => {
                connection.end()
            })
            .catch((error) => {
                console.error(error)
                connection.end()
            })
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}