import { APIKey } from '../../../variables';

export default async function getCards(listId, token) {
    try {

        const fetchBoard = await fetch(`https://api.trello.com/1/lists/${listId}/cards?fields=all&key=${APIKey}&token=${token}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        const response = await fetchBoard.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e)
    }
}