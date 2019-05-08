/* global describe, it */
import { assert } from 'chai'
import * as constraints from '../src/constraints'

describe('check constraints', () => {
  it('between passed', () => {
    const input   = 'test@samsy.com'
    const args    = [2, 255]
    const between = new constraints.between(args)

    assert.isTrue(between.valid(input))
  })

  it('between failed', () => {
    const input   = 'test@samsy.com'
    const args    = [2, 10]
    const between = new constraints.between(args)

    assert.isFalse(between.valid(input))
  })

  it('email passed', () => {
    const inputs = [
      'test@samsy.jp',
      'test.123@samsy.co.jp',
      '123.test@samsy.com',
      '.test@samsy.net'
    ]
    const email = new constraints.email()

    inputs.forEach(input => {
      assert.isTrue(email.valid(input))
    })
  })

  it('email failed', () => {
    const inputs = [
      'test',
      'test@',
      'test@samsy.'
    ]
    const email = new constraints.email()

    inputs.forEach(input => {
      assert.isFalse(email.valid(input))
    })
  })

  it('max passed', () => {
    const input = 'test@samsy.com'
    const args  = [255]
    const max   = new constraints.max(args)

    assert.isTrue(max.valid(input))
  })

  it('max failed', () => {
    const input = 'test@samsy.com'
    const args  = [10]
    const max   = new constraints.max(args)

    assert.isFalse(max.valid(input))
  })

  it('numeric passed', () => {
    const numeric = new constraints.numeric()

    assert.isTrue(numeric.valid(1234))
    assert.isTrue(numeric.valid('1234'))
  })

  it('numeric failed', () => {
    const numeric = new constraints.numeric()

    assert.isFalse(numeric.valid('abcd'))
  })

  it('regexp passed', () => {
    const input = 'test@samsy.com'
    const args  = ['^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$']
    const regex = new constraints.regex(args)

    assert.isTrue(regex.valid(input))
  })

  it('regexp failed', () => {
    const input = 'test@samsy.'
    const args  = ['^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$']
    const regex = new constraints.regex(args)

    assert.isFalse(regex.valid(input, args))
  })

  it('required passed', () => {
    const input = 'test@samsy.jp'
    const required = new constraints.required()

    assert.isTrue(required.valid(input))
  })

  it('required failed', () => {
    const input = ''
    const required = new constraints.required()

    assert.isFalse(required.valid(input))
  })
})
