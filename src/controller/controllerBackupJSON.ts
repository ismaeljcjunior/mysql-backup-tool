
// import mysql from 'mysql2'
import mysql from 'mysql2/promise';
const mysqldump = require('mysqldump')
import { exec } from 'child_process'
import { IDatabaseResultProps } from '../interfaces/interfaces'
import fs from 'fs'
import path from 'path'

export const runBackup = async () => {
    console.log('Running backup')
    const result = await mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'dabase-insert',
        },
    })
    console.log(result)

}