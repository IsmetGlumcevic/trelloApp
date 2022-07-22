import { APIKey, APIToken } from '../../../variables';

export default async function createCard(listId, name) {
    try {
        const create = await fetch(`https://api.trello.com/1/cards?idList=${listId}&name=${name}&key=${APIKey}&token=${APIToken}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        })
        const response = await create.text();
        return JSON.parse(response);
    } catch(e) {
        console.log(e)
    }
}