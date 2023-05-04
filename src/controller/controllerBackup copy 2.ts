import { PrismaClient } from '@prisma/client'

import { exec } from 'child_process'
import { IDatabaseResultProps } from '../interfaces/interfaces'

import path from 'path'

import * as fs from 'fs'
import * as mysql from 'mysql2'
import * as mysqldump from 'mysqldump'

const prisma = new PrismaClient()
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

export const runListDatabases = async () => {
    let listDatabases: any
    try {
        connection.query('SHOW DATABASES', async (error, results: IDatabaseResultProps[], fields) => {
            if (error) {
                console.error(`Erro ao listar bancos de dados: ${error.message}`)
                return
            }
            console.log('Bancos de dados disponíveis:')
            listDatabases = results.map(result => result.Database)
            console.log('runListDatabases', listDatabases)

            connection.end()
        })
    } catch (err) {
        console.log(err)
    }
}
export const exportDump = async (listDatabases: any) => {
    try {
        for (const database of listDatabases) {

            const options = {
                database: database,
                dest: `${database}.sql`
            }

            try {
                // Call mysqldump with the options
                const dump = await mysqldump({
                    connection: connection,
                    ...options
                })
                fs.writeFileSync(`${database}.sql`, dump)
                console.log(`Database ${database} dumped successfully`)
            } catch (err) {
                console.error(`Error dumping database ${database}:`, err)
            }
        }
    } catch (err) {

    }
}
