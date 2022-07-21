import { APIKey, APIToken } from '../../../variables';

export default async function updateListPosition(id, pos) {
    try {
        const updatePosition = await fetch(`https://api.trello.com/1/lists/${id}/?pos=${pos}&key=${APIKey}&token=${APIToken}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }
        })
        const response = await updatePosition.text();
        const data = await JSON.parse(response);
        return data;
    } catch (e) {
        console.log(e)
    }
}