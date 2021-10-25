import axios from 'axios'
import config from './config.js'
import Character from './models/character.js'
import Relation from './models/relation.js'

class Client {
  async get_characters() {
    const response = await this.GET('characters')
    const characters_json = response.data
    const characters = characters_json.map((character_json) => {
      return new Character(character_json)
    })
    return characters
  }

  async get_relations(){
    const response = await this.GET('relations')
    const relations_json = response.data
    const relations = relations_json.map((relation_json) => {
      return new Relation(relation_json)
    })
    return relations
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
