import Constraint from '../Constraint'

class Between extends Constraint {
  get name() {
    return 'between'
  }

  get message() {
    return 'The :attribute must be between :min and :max.'
  }

  get parameters() {
    return ['min', 'max']
  }

  valid(input) {
    const { min, max } = this.getParameters()
    if (typeof input === 'number') {
      return input >= min && input <= max
    }

    return (min <= input.length) && (input.length <= max)
  }
}

export default Between
