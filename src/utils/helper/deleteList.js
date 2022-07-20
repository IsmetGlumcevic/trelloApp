import { APIKey, APIToken } from '../../../variables';

export default async function deleteList(id) {
    try {
        const deletCrads = await fetch(`https://api.trello.com/1/lists/${id}/archiveAllCards?key=${APIKey}&token=${APIToken}`, {
            method: 'POST'
          })
        const closed = true;
        console.log("🚀 ~ file: deleteList.js ~ line 8 ~ deleteList ~ deletCrads", deletCrads)
        const deletelist = await fetch(`https://api.trello.com/1/lists/${id}/?closed=${closed}&key=${APIKey}&token=${APIToken}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }
        })
        console.log("🚀 ~ file: deleteList.js ~ line 15 ~ deleteList ~ deletelist", deletelist)
    } catch (e) {
        console.log(e)
    }
}