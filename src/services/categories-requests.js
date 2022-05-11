import axios from "axios";
import { API_URL, HEADERS } from "./requests.config";
const ENDPOINT = `${API_URL}/categories`

export async function getCategorieRequest(message_id) {

}

export async function addCategorieRequest(storedUser,{ name }) {
    const response = await axios.post(
        ENDPOINT, 
        { name, user_id: storedUser.id }, 
        { headers: HEADERS(storedUser) }
    );
    return response.data;
}

export async function deleteCategorieRequest(storedUser, categorie_id) {
    const response = await axios.delete(
        `${ENDPOINT}/${categorie_id}?user_id=${storedUser.id}`, 
        { headers: HEADERS(storedUser) }
    );
    return response.data;
}

export async function updateCategorieRequest(storedUser, categorie_id, name) {
    const response = await axios.put(
        `${ENDPOINT}/${categorie_id}`, 
        { name, user_id:storedUser.id }, 
        { headers: HEADERS(storedUser) }
    );
    return response.data;
}