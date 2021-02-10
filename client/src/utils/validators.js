export const required = field => value => value ? undefined : `Поле ${field} є обов'язкове`
export const maxLength = max => value => value.length <= max ? undefined : `Максимальна кількість символів ${max}`
export const minLength = min => value => value.length >= min ? undefined : `Мінімальна кількість символів ${min}`
export const email = value =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Некоректний email'
  : undefined


export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)