import Constraint from '../Constraint'
import { regexpFrom } from '../utils'

class Regex extends Constraint {
  get name() {
    return 'regex'
  }

  get message() {
    return 'The :attribute format is invalid.'
  }

  get parameters() {
    return ['source']
  }

  valid(input) {
    const { source } = this.getParameters()
    if (source instanceof RegExp) {
      return Boolean(input.match(source))
    }

    return Boolean(input.match(regexpFrom(source)))
  }
}

export default Regex
