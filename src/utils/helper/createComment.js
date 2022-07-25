import { APIKey } from '../../../variables';

export default async function createComment(cardId, text, token) {
    try {
        const create = await fetch(`https://api.trello.com/1/cards/${cardId}/actions/comments?text=${text}&key=${APIKey}&token=${token}`, {
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