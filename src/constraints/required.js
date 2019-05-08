import Constraint from '../Constraint'

class Required extends Constraint {
  get name() {
    return 'required'
  }

  get message() {
    return 'The :attribute field is required.'
  }

  valid(input) {
    if (typeof input === 'boolean') { return true }

    if (input === null || input === undefined) { return false }

    // array or string
    if (input.length !== undefined) { return input.length !== 0 }

    return Boolean(input)
  }
}

export default Required
