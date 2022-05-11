const BASE_ENDPOINT = 'api'
export const API_URL = `http://localhost:8000/${BASE_ENDPOINT}`;
export const HEADERS = (storedUser) => {
    return {
        'Authorization': storedUser.auth_token,
    }
}