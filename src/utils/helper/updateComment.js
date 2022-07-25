import { APIKey } from '../../../variables';

export default async function updateComment(cardId, text, idAction, token) {
    try {
        const create = await fetch(`https://api.trello.com/1/cards/${cardId}/actions/${idAction}/comments?text=${text}&key=${APIKey}&token=${token}`, {
            method: 'PUT',
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