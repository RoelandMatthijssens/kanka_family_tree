class Character {
  constructor(json) {
    this.id = json.id
    this.title = json.title
    this.name = json.name
    this.image = json.image_full
    this.entity_id = json.entity_id
    this.age = json.age
    this.sex = json.sex
    this.is_dead = json.is_dead
    this.children = []
    this.parents = []
    this.partner = null
  }

  populate_relations(all_relations, all_characters){
    const relevant_relations = all_relations.filter((i) => i.owner === this.entity_id)
    for(const relation of relevant_relations){
      const related_character = all_characters.find(i => i.entity_id === relation.target)
      switch (relation.type) {
        case "Parent":
          this.parents.push(related_character)
          break;
        case "Child":
          this.children.push(related_character)
          break;
        case "Partner":
          this.partner = related_character
          break;
      }
    }
    this.relations = relevant_relations
  }

  to_chart_data(){
    const tags = []
    function pid(char) {
      if(char.parents.length > 0){
        return char.parents[0].entity_id
      } else if(char.partner && char.sex == 'Female'){
        tags.push('partner')
        return char.partner.entity_id
      } else {
        return null
      }
    }

    function ppid(char) {
      if(char.parents.length > 1){
        return char.parents[1].entity_id
      } else {
        return null
      }
    }
    return {
      id: this.entity_id,
      title: this.title,
      pid: pid(this),
      ppid: ppid(this),
      name: this.name,
      tags: tags,
      img: this.image
    }
  }
}

export default Character
