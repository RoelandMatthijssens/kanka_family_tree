import axios from 'axios'
import config from './config.js'

class Client {
  async get_characters() {
    const response = await this.GET('characters')
    const characters = response.data
    return characters
  }

  async GET(path){
    try {
      const url = `${config.base_url}/campaigns/${config.campaign_id}/${path}`
      const response = await axios({
        method: 'get',
        url: url,
        headers: {
          'Authorization': `Bearer ${config.token}`
        }
      })
      return response.data
    } catch (error) {
      console.error(error);
    }
  }
}

export default Client
