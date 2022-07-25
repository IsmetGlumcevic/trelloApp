import { APIKey, APIToken } from '../../../variables';

export default async function deleteCard(id, token) {
    try {
        const deleteItem = await fetch(`https://api.trello.com/1/cards/${id}?key=${APIKey}&token=${token}`, {
            method: 'DELETE'
        })
        const response = await deleteItem.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e)
    }
}