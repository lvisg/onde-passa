import axios from 'axios'
const backEndClient = axios.create({
    baseURL: 'http://192.168.10.56:3000'
})

export default backEndClient