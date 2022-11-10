import axios from "axios";
console.log(process.env.NEXT_PUBLIC_BASE_URL,78)
const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export default Axios