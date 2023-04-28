import cron from 'node-cron'
import moment from 'moment'
import fs from 'fs'
const spawn = require('child_process').spawn
const dbList = ['db_sac', 'db_watchdog']

export const runBackup = async () => {
    try {
        if (!fs.existsSync('./backup')) {
            fs.mkdirSync('./backup')
        }
        console.log('---------------------')
        console.log('Iniciando Backup dos Bancos de Dados')

        // Loop para executar o backup para cada banco de dados da lista
        dbList.forEach((dbName) => {
            // Use moment.js ou qualquer outra forma para gerar o nome do arquivo dinamicamente
            const fileName = `${dbName}_${moment().format('YYYY_MM_DD')}.sql`
            const wstream = fs.createWriteStream(`./backup/${fileName}`)
            const mysqldump = spawn('mysqldump', ['-u', process.env.DB_USER, `-p${process.env.DB_PASSWORD}`, dbName])

            mysqldump
                .stdout
                .pipe(wstream)
                .on('finish', () => {
                    console.log(`Backup do Banco de Dados ${dbName} concluído!`)
                })
                .on('error', (err: any) => {
                    console.log(`Erro ao realizar backup do Banco de Dados ${dbName}: ${err}`)
                })

        })
    } catch (err) {
        console.log(`Error: ${err}`)

    }

}