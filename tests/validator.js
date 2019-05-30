/* global describe, it */
import { assert } from 'chai'
import Validator from '../src'

describe('Validator tests', () => {
  const rules = {
    email: 'required|email|max:20',
    password: 'required|max:255',
    postcode: ['regex:/^[0-9]{3}-[0-9]{4}$/']
  }

  const messages = {
    required: ':attribute は必須項目です。',
    email: 'メールアドレスの形式が違います。',
    max: ':attribute の文字数は :value 以下で入力してください。',
    regex: ':attribute は 000-0000 の形式で入力してください。'
  }

  it('create instance', () => {
    assert.isOk(new Validator(rules))
    const validator = new Validator(rules, { messages })
    assert.isOk(validator)
  })

  describe('email', () => {
    it('work email validate', () => {
      const validator = new Validator(rules, { messages })
  
      validator.validate('email', 'sample@email.com')
      assert.isUndefined(validator.getError('email'))
  
      validator.validate('email', 'sample')
      assert.hasAllKeys(
        validator.getError('email'),
        ['attribute', 'constraint', 'message', 'parameters', 'value']
      )
    })
  
    it('error messages', () => {
      const validator = new Validator(rules, { messages })
  
      validator.validate('email', '')
      assert.equal(
        validator.getError('email').message,
        'email は必須項目です。'
      )
  
      validator.validate('email', 'sample')
      assert.equal(
        validator.getError('email').message,
        'メールアドレスの形式が違います。'
      )
  
      validator.validate('email', 'testingtoolongemail@email.com')
      assert.equal(
        validator.getError('email').message,
        'email の文字数は 20 以下で入力してください。'
      )
    })
  })

  describe('password', () => {
    it('work password confirmation validate', () => {
      const validator = new Validator({
        password: 'required|max:255',
        confirmPassword: 'required|confirmed:password|max:255',
      },
      {
        attributes: {
          password: 'パスワード',
          confirmPassword: 'ほげ'
        }
      })

      validator.validate('password', 'pass')
      validator.validate('confirmPassword', 'pass')
      assert.isUndefined(validator.getError('confirmPassword'))
  
      validator.validate('password', 'sample@emaia.com')
      validator.validate('confirmPassword', 'sample@email.com')
      assert.hasAllKeys(
        validator.getError('confirmPassword'),
        ['attribute', 'constraint', 'message', 'parameters', 'value']
      )
    })

    it('error messages', () => {
      const validator = new Validator({
        password: 'required|max:255',
        confirmPassword: 'required|confirmed:パスワード|max:255'
      },
      {
        attributes: {
          password: 'パスワード',
          confirmPassword: 'パスワード（確認用）'
        },
        messages: {
          required: ':attribute は必須項目です。',
          confirmed: ':attribute と :field が異なります。'
        }
      })

      validator.validate('password', '')
      validator.validate('confirmPassword', '')
      assert.equal(
        validator.getError('password').message,
        'パスワード は必須項目です。'
      )
      assert.equal(
        validator.getError('confirmPassword').message,
        'パスワード（確認用） は必須項目です。'
      )

      validator.validate('password', 'pass')
      validator.validate('confirmPassword', 'diff')
      assert.equal(
        validator.getError('confirmPassword').message,
        'パスワード（確認用） と パスワード が異なります。'
      )
    })
  })

  describe('postcode', () => {
    it('work regex validate', () => {
      const validator = new Validator(rules, { messages })
  
      validator.validate('postcode', '')
      assert.isUndefined(validator.getError('postcode'))

      validator.validate('postcode', '123-1234')
      assert.isUndefined(validator.getError('postcode'))
  
      validator.validate('postcode', '123-000')
      assert.hasAllKeys(
        validator.getError('postcode'),
        ['attribute', 'constraint', 'message', 'parameters', 'value']
      )
    })

    it('error messages', () => {
      const validator = new Validator(
        rules,
        {
          attributes: {
            postcode: '郵便場号'
          },
          messages
        }
      )

      validator.validate('postcode', '123-000')
      assert.equal(
        validator.getError('postcode').message,
        '郵便場号 は 000-0000 の形式で入力してください。'
      )
    })
  })

  it('shoule be left the rule priority when multiple invalid.', () => {
    const validator = new Validator(rules, { messages })
    validator.validate('email', '')
    assert.hasAllKeys(
      validator.getError('email'),
      ['attribute', 'constraint', 'message', 'parameters', 'value']
    )

    assert.equal(validator.getError('email').constraint, 'required')
  })

  it('work validateMap', () => {
    const validator = new Validator(rules, { messages })
    validator.validateMap({
      email: 'invalid',
      password: ''
    })

    assert.hasAllKeys(
      validator.getErrors(),
      ['email', 'password']
    )

    validator.validateMap({
      email: 'valid@test.jp',
      password: 'secret'
    })

    assert.isTrue(!validator.hasErrors())
  })

  it('work nullable validate', () => {
    const rules = { email: 'email|max:20' }
    const validator = new Validator(rules)

    validator.validate('email', '')
    assert.isFalse(validator.hasErrors())

    validator.validate('email', 'hoge@sample.jp')
    assert.isFalse(validator.hasErrors())

    validator.validate('email', '@sample.jp')
    assert.isTrue(validator.hasErrors())
  })
})
