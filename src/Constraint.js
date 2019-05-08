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

  valid() {
    return false
  }
}

export default Constraint
