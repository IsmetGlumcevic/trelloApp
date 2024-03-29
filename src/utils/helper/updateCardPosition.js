import { APIKey } from '../../../variables';

export default async function updateCardPosition(id, pos, token) {
    try {
        const updatePosition = await fetch(`https://api.trello.com/1/cards/${id}/?pos=${pos}&key=${APIKey}&token=${token}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }
        })
        const response = await updatePosition.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e)
    }
}