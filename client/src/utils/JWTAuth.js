import axios from 'axios'
const SERVER_URL = 'http:/127.0.0.1:4000'

const login = async (data) => {
    const LOG_ENDPOINT = `${SERVER_URL}/users/login`
    try {
        let response = await axios.post(LOG_ENDPOINT, data)
        console.log("RESPONSE DATA", response.data)
    } catch (e) {
        console.log(e)
    }
}

export { login }