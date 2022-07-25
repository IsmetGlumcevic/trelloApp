import { APIKey, APIToken } from '../../../variables';

export default async function deleteBoard(id, token) {
    try {
        const deleteItem = fetch(`https://api.trello.com/1/boards/${id}?key=${APIKey}&token=${token}`, {
            method: 'DELETE'
        })
    } catch (e) {
        console.log(e)
    }
}