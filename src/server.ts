import dotenv from 'dotenv'
dotenv.config()
import nodeSchedule from 'node-schedule'
import { getDatabase, runBackup } from './controller/controllerBackup'


const main = async () => {
    try {
        await runBackup()
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}
const job = nodeSchedule.scheduleJob('0-59/05  * * * * *', () => {
    main()
})