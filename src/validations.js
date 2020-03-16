const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const VALIDATIONS = {
  email: {
    message: 'Invalid email address',
    logic: (email) => email && EMAIL_REGEXP.test(email)
  },
  password: {
    message: 'Password should have more than 7 symbols',
    logic: (password) => password && password.length > 7
  },
  firstName: {
    message: 'First name should be present',
    logic: (firstName) => firstName.length > 0
  },
  lastName: {
    message: 'Last name should be present',
    logic: (lastName) => lastName.length > 0
  }
}
export const validate = (values) => {
  const errors = {}
  const availableValidations = Object.getOwnPropertyNames(VALIDATIONS)

  for (let [key, value] of Object.entries(values)) {
    if (availableValidations.includes(key) && !VALIDATIONS[key].logic(value)) {
      errors[key] = VALIDATIONS[key].message
    }
  }

  return errors
}
