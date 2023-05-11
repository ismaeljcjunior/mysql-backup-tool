import dotenv from 'dotenv'
dotenv.config()
import nodeSchedule from 'node-schedule'
import { runBackup, runListDatabases } from './controller/controllerBackup'

const main = async () => {
    try {
        await runListDatabases()
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}
const job = nodeSchedule.scheduleJob('0-59/30  * * * * *', () => {
    main()
})