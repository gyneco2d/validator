import Constraint from '../Constraint'

class Numeric extends Constraint {
  get name() {
    return 'number'
  }

  get message() {
    return 'The :attribute must be a number.'
  }

  valid(input) {
    return !Number.isNaN(parseInt(input, 10))
  }
}

export default Numeric
