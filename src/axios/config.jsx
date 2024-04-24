import axios from 'axios'

const apiFlags = axios.create({
    baseURL: "https://restcountries.com/v3.1/",
    headers: {
        "Content-Type": "application/json",
    },
})


export default apiFlags;