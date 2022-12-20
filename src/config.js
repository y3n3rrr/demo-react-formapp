import axios from "axios"

export const BASE_URL = "https://localhost:7089/"


export const APIHandler = axios.create({
    baseURL:BASE_URL,
    headers:{
    }
})