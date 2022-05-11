import axios from "axios";
import { API_URL, HEADERS } from "./requests.config";
const ENDPOINT = `${API_URL}/users`

export async function loginRequest(username, password){
    const response = await axios.post(`${ENDPOINT}/login`, { username, password });    
    return response.data
}

export async function createUserRequest(username, password, email, phone_number){
    const response = await axios.post(`${ENDPOINT}/sign-up`, { username, password, email, phone_number })
    return response.data;
}   

export async function updateUserRequest(storedUser, { username, password, phone_number }){
    const response = await axios.put(
        `${ENDPOINT}/${storedUser.id}`, 
        { username, password, phone_number },
        { headers: HEADERS(storedUser) }  
    )
    return response.data;
}   

export async function getUserCategoriesRequest(user){
    const response = await axios.get(`${ENDPOINT}/${user.id}/categories`, { headers: HEADERS(user) })
    return response.data
}

export async function getUserMessagesRequest(user){
    const response = await axios.get(`${ENDPOINT}/${user.id}/messages`, { headers: HEADERS(user) })
    return response.data
}