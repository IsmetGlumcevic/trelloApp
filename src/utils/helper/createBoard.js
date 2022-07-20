import { APIKey, APIToken } from '../../../variables';

export default async function createBoard(name) {
    try {
        const create = await fetch(`https://api.trello.com/1/boards/?name=${name}&key=${APIKey}&token=${APIToken}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        })
        const response = await create.text();
        const data = await JSON.parse(response);
        return data;
    } catch(e) {
        console.log(e)
    }
}