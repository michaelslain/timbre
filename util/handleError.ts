import { toast } from 'react-toastify'
import isServer from './isServer'

const handleError = async (name: string, msg: string) => {
    // if error (client)
    if (!isServer()) {
        toast.error(msg, { theme: 'colored' })
        return
    }

    // msg.replaceAll('/n', '/n -- ')

    // if error (server)
    console.log('\x1b[31m')
    console.log('- Error -')
    console.log('********************************************')
    console.log()
    console.error('Name:', name)
    console.error('-- ', msg)
    console.log()
    console.log('********************************************')
    console.log('\x1b[0m')
    console.log()
}

export default handleError
