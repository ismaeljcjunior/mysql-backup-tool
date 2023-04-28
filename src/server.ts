import dotenv from 'dotenv'
dotenv.config()
import nodeSchedule from 'node-schedule'

const main = async () => {
    try {

    } catch (err) {
        console.log(`Error: ${err}`)
    }
}
const job = nodeSchedule.scheduleJob('0-59/5  * * * * *', () => {
    main()
})