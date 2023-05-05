import fs from 'fs'
import { exec } from 'child_process'
import mysqldump from 'mysqldump'
import { PrismaClient } from '@prisma/client'
import { IDatabaseResultProps } from '../interfaces/interfaces'
import path from 'path'

const prisma = new PrismaClient()
const spawn = require('child_process').spawn


export const getDatabase = async () => {

    try {
        const result: IDatabaseResultProps = await prisma.$queryRaw`SELECT schema_name FROM information_schema.schemata`
        const databaseNames = result.map((item: { SCHEMA_NAME: any }) => item.SCHEMA_NAME)
        console.log(`Consulta bruta executada: SHOW DATABASES`)
        console.log(`Resultado:`, databaseNames)
    } catch (e) {
        console.log(`Erro: ${e}`)
    }

}
export const runBackup = async () => {
    const dumpFileName = `${Math.round(Date.now() / 1000)}.dump.sql`
    const writeStream = fs.createWriteStream(dumpFileName)
    const dump = spawn('mysqldump', [
        '-u',
        'root',
        '-p123456',
        'db_notificacoes',
    ])
    try {
        dump
            .stdout
            .pipe(writeStream)
            .on('finish', function () {
                console.log('Completed')
            })
            .on('error', function (err: any) {
                console.log(err)
            })
    } catch (e) {
        console.log('catch', e)
    }
}


// export const runBackup = async () => {
//     try {
//         if (!fs.existsSync('./backup')) {
//             fs.mkdirSync('./backup')
//         }
//         console.log('---------------------')
//         console.log('Iniciando Backup dos Bancos de Dados')

//         dbList.forEach((dbName) => {

//             const fileName = `${dbName}_${moment().format('YYYY_MM_DD')}.sql`
//             const wstream = fs.createWriteStream(`./backup/${fileName}`)
//             const mysqldump = spawn('mysqldump', ['-u', process.env.DB_USER, `-p${process.env.DB_PASSWORD}`, dbName])

//             mysqldump
//                 .stdout
//                 .pipe(wstream)
//                 .on('finish', () => {
//                     console.log(`Backup do Banco de Dados ${dbName} concluído!`)
//                 })
//                 .on('error', (err: any) => {
//                     console.log(`Erro ao realizar backup do Banco de Dados ${dbName}: ${err}`)
//                 })
//         })
//     } catch (err) {
//         console.log(`Error: ${err}`)
//     }
// }