import Parser from './Parser'

class Validator {
  constructor(rules, options = {}) {
    const { messages = {}, attributes = {}, constraints = {}} = options
    this.rules = Parser.parse(rules, constraints)

    this.messages = messages
    this.attributes = attributes
    this.errors = {}
    this.passes = {}
    this.inputs = {}
  }

  getRule(attribute) {
    return this.rules[attribute]
  }

  getRules() {
    return this.rules
  }

  makeMessage(attribute, constraint) {
    attribute = this.attributes[attribute] || attribute
    let message = this.messages[constraint.name] || constraint.message
    message = message.replace(':attribute', attribute)

    constraint.parameters.forEach(parameterName => {
      message = message.replace(`:${parameterName}`, constraint.getParameters()[parameterName])
    })

    return message
  }

  hasErrors() {
    return Object.keys(this.errors).length !== 0
  }

  hasError(attribute) {
    if (typeof this.passes[attribute] === 'undefined') return false
    return !this.passes[attribute]
  }

  getErrors() {
    return Object.assign({}, this.errors)
  }

  getError(attribute) {
    return this.errors[attribute]
  }

  clear() {
    this.errors = {}
    this.passes = {}
    this.inputs = {}
  }

  validate(attribute, input) {
    this.inputs[attribute] = input
    if (!this.getRule(attribute)) {
      return {}
    }

    if (this.errors[attribute]) { delete this.errors[attribute] }
    this.passes[attribute] = true

    this.getRule(attribute).constraints.forEach(constraint => {
      if (!this.errors[attribute] && !constraint.valid(input, this)) {
        this.errors[attribute] = {
          attribute   : attribute,
          constraint  : constraint.name,
          message     : this.makeMessage(attribute, constraint),
          parameters  : constraint.parameters,
          value       : input
        }
        this.passes[attribute] = false
      }
    })

    return Object.assign({}, this.errors)
  }

  validateMap(map = {}) {
    Object.keys(map).forEach(key => this.validate(key, map[key]))
    return Object.assign({}, this.errors)
  }
}

export default Validator
