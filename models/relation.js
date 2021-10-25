class Relation {
  static types = {
    'Parent': "parent",
    'Child': "child"
  }
  constructor(json) {
    this.owner = json.owner_id
    this.target = json.target_id
    this.type = json.relation
  }
}

export default Relation
