import { APIKey, APIToken } from '../../../variables';

export default async function getBoards(token) {
    try {
      const response = await fetch(`https://api.trello.com/1/members/me/boards?key=${APIKey}&token=${APIToken}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      const text = await response.text();
      return JSON.parse(text)
    } catch (e) {
      console.log(e)
    }
  }

