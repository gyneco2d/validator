import * as defineConstraints from './constraints'
import Rule from './Rule'

const parseSignature = (name, signature, constraints) => {
  const parsedConstraints = []

  signature.split('|').forEach(string => {
    const array = string.split(':')
    const Constraint = constraints[array[0]]
    const parameters = array.length === 2 ? array[1].split(',') : []
    if (!Constraint) {
      throw new Error(`Not found rules for ${array[0]}`)
    }

    parsedConstraints.push(new Constraint(parameters))
  })

  return new Rule({ name: name, constraints: parsedConstraints })
}

const parseArray = (name, array, constraints) => {
  const parsedConstraints = array.map(value => {
    // constraintName is for example "aaa" of "aaa:/bbb|ccc|ddd:eee".
    const constraintName = value.split(':', 1)[0]
    const constraintParameters = [].concat(value.split(':').slice(1).join(':') || [])
    const Constraint = constraints[constraintName]

    return new Constraint(constraintParameters)
  })

  return new Rule({ name: name, constraints: parsedConstraints })
}

class Parser {
  static parse(rules, customConstraints = {}) {
    const parsedRules = {}
    const mergedConstraints = { ...defineConstraints, ...customConstraints }

    Object.keys(rules).forEach(ruleKey => {
      const ruleValue = rules[ruleKey]

      switch (typeof ruleValue) {
        case 'string':
          parsedRules[ruleKey] = parseSignature(ruleKey, ruleValue, mergedConstraints)
          break
        case 'object':
          if (Array.isArray(ruleValue)) {
            parsedRules[ruleKey] = parseArray(ruleKey, ruleValue, mergedConstraints)
          }
          break
        default:
          throw new Error('Unsupported type.')
      }
    })

    return parsedRules
  }
}

export default Parser
