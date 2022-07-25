import { APIKey } from '../../../variables';

export default async function deleteToken(token) {
    try {
        const create = await fetch(`https://api.trello.com/1/tokens/${token}/?key=${APIKey}&token=${token}`, {
            method: 'DELETE',
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