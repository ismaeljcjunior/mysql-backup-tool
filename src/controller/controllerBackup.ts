import { PrismaClient } from '@prisma/client'
import mysql from 'mysql2'
import { exec } from 'child_process'

const prisma = new PrismaClient()

export const runBackup = async () => {
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        })
        connection.connect()
        const databases = ['database1', 'database2', 'database3'] 

        const date = new Date().toISOString().replace(/:/g, '-') 
        databases.forEach(database => {
            const filename = `${database}_${date}.sql` 
            exec(`mysqldump --single-transaction --quick --lock-tables=false --host=${connection.config.host} --user=${connection.config.user} --password=${connection.config.password} ${database} > ${filename}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro ao gerar dump para o banco de dados ${database}: ${error.message}`)
                    return
                }
                console.log(`Dump do banco de dados ${database} gerado com sucesso`)
            })
        })
        connection.end()
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}