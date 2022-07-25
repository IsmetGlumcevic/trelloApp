import { APIKey } from '../../../variables';

export default async function deleteComment(cardId, idAction, token) {
    try {
        const create = await fetch(`https://api.trello.com/1/cards/${cardId}/actions/${idAction}/comments?key=${APIKey}&token=${token}`, {
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