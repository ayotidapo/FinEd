import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://api.themoneystaging.com'
})

export default Axios