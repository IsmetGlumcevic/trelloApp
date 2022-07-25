import { APIKey } from '../../../variables';

export default async function updateList(id, name, token) {
    try {
        const updatePosition = await fetch(`https://api.trello.com/1/lists/${id}/?name=${name}&key=${APIKey}&token=${token}`, {
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