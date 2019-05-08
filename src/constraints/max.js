import Constraint from '../Constraint'

class Max extends Constraint {
  get name() {
    return 'max'
  }

  get message() {
    return 'The :attribute must be less than or equal :value.'
  }

  get parameters() {
    return ['value']
  }

  valid(input) {
    const { value } = this.getParameters()
    if (typeof input === 'number') { return input <= value }
    return input.length <= value
  }
}

export default Max
