/* global describe, it */

import { assert } from 'chai'
import Validator from '../src'
import { Constraint } from '../src'

class PostcodeConstraint extends Constraint {
  get name() {
    return 'postcode'
  }

  get message() {
    return ':attribute は 000-0000 の形式で入力してください'
  }

  valid(input) {
    return Boolean(input.match(/^[0-9]{3}-[0-9]{4}$/))
  }
}

describe('custom constraints tests', () => {
  const rules = {
    postcode: 'required|postcode'
  }

  it('it works custom constraint', () => {
    const options = {
      constraints: {
        postcode: PostcodeConstraint
      }
    }
    const validator = new Validator(rules, options)
    validator.validate('postcode', '111-111')
    assert.hasAnyKeys(validator.getError('postcode'), 'message')

    validator.validate('postcode', '111-1111')
    assert.isUndefined(validator.getError('postcode'))
  })
})