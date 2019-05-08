# Validator for JavaScript

version 0.1.0

## Guide
``` jsx
import Validator from '@kra/validator'

// [1] Define validation rules 
const rules = {
  email: 'required|email|max:100',
  password: 'required|max:255'
}

// [2] Define options messages
const options = {
  messages : {
    required: ':attribute は必須項目です。',
    email: 'メールアドレスの形式が違います。',
    max: ':attribute の文字数は :value 以下で入力してください。'
  }
}

// [3] Create validator instance
const validator = new Validator(rules, options)

// [4] Lets validate
const errros = validator.validate('email', 'some@email.com')

if (errors.email) {
    // has email error
    console.log(errors.email.message)
} else {
    // not error
}
```

## Error Object
``` js
{
    'aRule': {
        attribute,
        constraint,
        message,
        parameters
    },
    ...
}
```

## Rules
Rules: ルール
stringで以下のように表す
`email: required|email|between:5,20`

ルール名は`キー`で表し、制約はパイプ(`|`)で区切る。
制約はコロン(`:`)とカンマ(`,`)でそのパラメータを表す。

> regex では配列を利用してください。  
> `postcode: ['required', 'regex:/[0-9]{3}-[0-9]{4}/']`

- Constraint: 制約

## Constraint一覧
- between `between:<min>,<max>`
- email `email`
- max `max:<value>`
- regex `regex:<RegExp>`
- required `required`
- numeric `numeric`
- confirmed `confirmed:<field>`
ex: 
``` js
const rules = {
  password: 'required|between:5,255',
  passwordConfirmed: 'required|between:5,255|confirmed:password'
}
```

## APIs

- `validate(attribute: string, input: string): object`

- `getRules(): array<Rule>`
- `getRule(attribute: string): Rule`
- `getErrors(): object`
- `getError(attribute): object`
- `hasErrors(): boolean`
- `hasError(attribute): boolean`
- `removeErrors(): void`
- `clear(): void`

## with React
Class Component:
``` jsx
import React from 'react'
import Validator from '@kra/validator' 

// [1] Define validation rules 
const rules = {
  email: 'required|email|max:15',
  password: 'required|max:255'
}

// [2] Define error messages
// :attribute is validation rule key
// :parameters is validation rules parameters
const messages = {
  required: ':attributeは必須項目です。',
  email: 'メールアドレスの形式が違います。',
  max: ':attributeの文字数は :parameters[0] 以下で入力してください。'
}

// [3] Define custom attributes
const attributes = {
  email: 'メールアドレス',
  password: 'パスワード'
}

// [4] Create validator instance
const validator = new Validator(rules, { messages, attributes })

class SomeComponent extends React.Component {
  state = {
    errors: {}
  }

  handleChange = type => event => {
    const errors = validator.validate(type, event.target.value)
    this.setState({
      errors: errors
    })
  }
  
  render() {
    const {
      errors
    } = this.state
  
    return (
      <SomeForm>
        <InputEmail 
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email.message}
        />
        <InputPassword
          error={Boolean(errors.password)}
          helperText={errors.password && errors.email.password}
        />
      </SomeForm>
    )
  } 

}
```

Make hooks

ex:makeValidate.js
``` js
import { useState } from 'react'
import Validator from '@samsy/validator'

const makeValidate = (rules, options) => {
  const validator = new Validator(rules, options)

  const useValidate = () => {
    const [errors, setErros] = useState({})
    const validate = inputs => {
      const result = validator.validateMap(inputs)
      setErros(result)
      return Object.keys(result).length === 0
    }

    return [errors, validate]
  }

  return useValidate
}

export default makeValidate
```

use hook
``` js
import React from 'react'
import TextField from '@material-ui/core/TextField'
import makeValidate from 'path/to/makeValidate'

const rules = {
  email: 'required|email|max:255',
  password: 'required|between:5,255'
}

const messages = {
  required: ':attributeは必須項目です',
  email: ':attributeの形式が違います',
  max: ':attributeの文字数は:value文字以下で入力してください',
  between: ':min文字以上、:max文字以下で入力して下さい'
}

const attributes = {
  email: 'メールアドレス',
  password: 'パスワード'
}

const useValidate = makeValidate(rules, { messages, attributes })

const SimpleForm = props => {
  const [errors, validate] = useValidate()

  const handleChange = type => event => {
    validate(type, event.target.value)
  }

  return (
    <form>
      <TextField
        error={Boolean(errors.name)}
        helperText={errors.name && errors.name.message}
        label='email'
        onChange={handleChange('email')}
        type='email'
      />
      <TextField
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
        label='passworc'
        onChange={handleChange('password')}
        type='password'
      />
    </form>
  )
}

```

# Custom Constraint
``` js
import { Constraint } from '@kra/validator'

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

const validator = new Validator(rules, {
  constraints: {
    postcode: PostcodeConstraint,
    ...
  }
})
```

# LICENCE
MIT
