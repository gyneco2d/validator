import Constraint from '../Constraint'

class Email extends Constraint {
  get name() {
    return 'email'
  }

  get message() {
    return 'The :attribute must be a valid email address.'
  }

  valid(input) {
    return Boolean(input.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
  }
}

export default Email
