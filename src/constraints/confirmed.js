import Constraint from '../Constraint'

class Confirmed extends Constraint {
  get name() {
    return 'confirmed'
  }

  get message() {
    return `The :attribute must be the same as ${this.field}`
  }

  get parameters() {
    return ['field']
  }

  valid(input, validator) {
    const fieldName = this.getParameter('field')

    this.field = validator.attributes[fieldName] || fieldName

    return input === validator.inputs[fieldName]
  }
}

export default Confirmed
