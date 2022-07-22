import { APIKey, APIToken } from '../../../variables';

export default async function createList(name, idBoard) {
    try {
        const create = await fetch(`https://api.trello.com/1/lists?name=${name}&idBoard=${idBoard}&key=${APIKey}&token=${APIToken}`, {
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