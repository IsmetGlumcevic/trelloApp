import { APIKey } from '../../../variables';

export default async function createBoard(name, token) {
    try {
        const create = await fetch(`https://api.trello.com/1/boards/?name=${name}&key=${APIKey}&token=${token}`, {
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