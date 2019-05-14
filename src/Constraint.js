class Constraint {
  constructor(args = []) {
    const parameters = {}
    args.forEach((arg, index) => {
      parameters[this.parameters[index]] = arg
    })

    this.getParameters = () => parameters
    this.getParameter = key => parameters[key]
  }

  get name() {
    return ''
  }

  get parameters() {
    return []
  }

  prevalid(input, attribute, validator) {
    const isNullable = !validator.getRule(attribute).constraints.some(constraint => constraint.name === 'required')
    const isEmpty = !input && input !== 0

    if (isNullable && isEmpty) {
      return true
    }

    return this.valid(input, validator)
  }

  valid(/* input, validator */) {
    return false
  }
}

export default Constraint
