const BASE_ENDPOINT = 'api'
// export const API_URL = `http://localhost:8000/${BASE_ENDPOINT}`;
export const API_URL = `https://whatsapp-message-pool.herokuapp.com/${BASE_ENDPOINT}`;
export const HEADERS = (storedUser) => {
    return {
        'Authorization': storedUser.auth_token,
    }
}