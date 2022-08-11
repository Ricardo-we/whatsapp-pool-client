import axios from "axios";
import { API_URL, HEADERS } from "./requests.config";
const ENDPOINT = `${API_URL}/messages`;

export async function getMessageRequest(message_id) {}

export async function addMessageRequest(storedUser, payload) {
	const response = await axios.post(
		ENDPOINT,
		{ user_id: storedUser.id, ...payload },
		{ headers: HEADERS(storedUser) },
	);
	return response.data;
}

export async function sendMessageToWhatsapp(storedUser, message_id) {
	const response = await axios.post(
		`${ENDPOINT}/${message_id}/send`,
		{ user_id: storedUser.id },
		{ headers: HEADERS(storedUser) },
	);
	return response.data;
}

export async function deleteMessageRequest(storedUser, message_id) {
	const response = await axios.delete(
		`${ENDPOINT}/${message_id}?user_id=${storedUser.id}`,
		{ headers: HEADERS(storedUser) },
	);
	return response.data;
}

export async function updateMessageRequest(
	storedUser,
	message_id,
	{ message_to, message_to_number, message, categorie_id },
) {
	const response = await axios.put(
		`${ENDPOINT}/${message_id}`,
		{
			user_id: storedUser.id,
			message_to,
			message,
			message_to_number,
			categorie_id,
		},
		{ headers: HEADERS(storedUser) },
	);
	return response.data;
}
