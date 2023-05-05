import fs from 'fs-extra'
import { exec } from 'child_process'
import mysqldump from 'mysqldump'
import { PrismaClient } from '@prisma/client'
import { IDatabaseResultProps } from '../interfaces/interfaces'
import path from 'path'
import { format } from 'date-fns'

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
    const now = new Date()
    const dbName = 'db_notificacoes'
    const backupDir = path.join(__dirname, '..', 'backupdump', dbName)
    const maxBackups = 10
    const dumpFileName = `${format(now, 'yyyy_MM_dd_HH_mm_ss')}.dump.sql`
    const dumpFilePath = path.join(backupDir, dumpFileName)

    const writeStream = fs.createWriteStream(dumpFilePath)
    const dump = spawn('mysqldump', ['-u', 'root', '-p123456', dbName])

    try {
        // Cria a pasta de backup com o nome do banco de dados
        await fs.ensureDir(backupDir)

        // Obtém a lista de arquivos de backup existentes
        const backupFiles = await fs.readdir(backupDir)

        // Se houver mais de 10 arquivos, exclui o mais antigo
        if (backupFiles.length >= maxBackups) {
            backupFiles.sort()
            const oldestBackup = backupFiles[0]
            const oldestBackupPath = path.join(backupDir, oldestBackup)
            await fs.unlink(oldestBackupPath)
        }

        // Cria o nome do arquivo de backup usando a data/hora atual
        const dateStr = new Date().toISOString().replace(/:/g, '-')
        const dumpFileName = `${dateStr}.dump.sql`
        const dumpFilePath = path.join(backupDir, dumpFileName)

        // Cria o arquivo de backup
        const writeStream = fs.createWriteStream(dumpFilePath)
        const dump = spawn('mysqldump', [
            '-u',
            'root',
            '-p123456',
            dbName,
        ])
        dump.stdout.pipe(writeStream)
        await new Promise<void>((resolve, reject) => {
            dump.on('exit', (code: any) => {
                if (code === 0) {
                    resolve()
                } else {
                    reject(new Error(`mysqldump exited with code ${code}`))
                }
            })
            dump.on('error', (err: any) => {
                reject(err)
            })
        })

        console.log(`Backup completed: ${dumpFileName}`)
    } catch (e) {
        console.error(`Error during backup: ${e}`)
    }
}
