import { APIKey, APIToken } from '../../../variables';

export default async function deleteBoard(id) {
    try {
        const deleteItem = fetch(`https://api.trello.com/1/boards/${id}?key=${APIKey}&token=${APIToken}`, {
            method: 'DELETE'
        })
    } catch (e) {
        console.log(e)
    }
}