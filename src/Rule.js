/* eslint class-methods-use-this:off */
class Rule {
  constructor(params) {
    this.attributes = {
      name        : params.name,
      constraints : params.constraints
    }
  }

  /**
   * @var {string}
   */
  get name() {
    return this.attributes.name
  }

  /**
   * @var {array<Constraint>}
   */
  get constraints() {
    return this.attributes.constraints
  }
}

export default Rule
