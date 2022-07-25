import { APIKey } from '../../../variables';

export default async function getCard(cardId, token) {
    try {
        const fetchCard = await fetch(`https://api.trello.com/1/cards/${cardId}?key=${APIKey}&token=${token}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        const response = await fetchCard.text();
        return JSON.parse(response);
    } catch (e) {
        console.log(e)
    }
}