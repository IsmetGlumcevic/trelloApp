import { APIKey, APIToken } from '../../../variables';

export default async function deleteList(id) {
    try {
        const deletCrads = await fetch(`https://api.trello.com/1/lists/${id}/archiveAllCards?key=${APIKey}&token=${APIToken}`, {
            method: 'POST'
          })
        const closed = true;
        const deletelist = await fetch(`https://api.trello.com/1/lists/${id}/?closed=${closed}&key=${APIKey}&token=${APIToken}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }
        })
    } catch (e) {
        console.log(e)
    }
}