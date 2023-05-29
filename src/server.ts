import dotenv from 'dotenv'
dotenv.config()
import nodeSchedule from 'node-schedule'
import { runBackup } from './controller/controllerBackupJSON'


const main = async () => {
    try {
        await runBackup()
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}
main()
// const job = nodeSchedule.scheduleJob('0-59/59  * * * * *', () => {
//     main()
// })