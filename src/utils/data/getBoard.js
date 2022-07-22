import { APIKey, APIToken } from '../../../variables';

export default async function getBoard(boardId) {
    try {
        const fetchBoard = await fetch(`https://api.trello.com/1/boards/${boardId}?fields=name&lists=all&list_fields=all&key=${APIKey}&token=${APIToken}`, {
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