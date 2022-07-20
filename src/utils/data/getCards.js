import { APIKey, APIToken } from '../../../variables';

export default async function getCards(listId) {
    try {

        const fetchBoard = await fetch(`https://api.trello.com/1/lists/${listId}/cards?fields=all&key=${APIKey}&token=${APIToken}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        const response = await fetchBoard.text();
        const boardData = await JSON.parse(response);
        return boardData;
    } catch (e) {
        console.log(e)
    }
}