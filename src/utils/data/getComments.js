import { APIKey } from '../../../variables';

export default async function getComments(cardId, token) {
    try {
        const fetchComment = await fetch(`https://api.trello.com/1/cards/${cardId}/actions?key=ef636ab61049066639b7a247d4c9f008&token=${token}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        const response = await fetchComment.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e)
    }
}