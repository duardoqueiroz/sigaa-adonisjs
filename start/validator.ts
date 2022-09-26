import { validator } from '@ioc:Adonis/Core/Validator'
import { isCPF } from 'brazilian-values'

validator.rule('cpf', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }

  if (!isCPF(value)) {
    options.errorReporter.report(
      options.pointer,
      'cpf',
      'cpf validation failed',
      options.arrayExpressionPointer
    )
  }
  options.mutate(value.replace(/[^\d]+/g, ''))
})
