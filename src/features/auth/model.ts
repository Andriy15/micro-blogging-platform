import {Fields} from "./constants";

export const getError = (field: Fields, errors: any) => {
    switch (field) {
      case Fields.email:
        if (errors.email?.type === 'required') {
          return 'This field is required'
        }
        if (errors.email?.type === 'pattern') {
          return 'This field must be an email'
        }
        return ''
      case Fields.password:
        if (errors.password?.type === 'required') {
          return 'This field is required'
        }
        if (errors.password?.type === 'minLength') {
          return 'Min length is 8 symbols'
        }
        if (errors.password?.type === 'pattern') {
          return 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        }
        break
      case Fields.confirmPassword:
        if (errors.confirmPassword?.type === 'required') {
            return 'This field is required'
        }
        if (errors.confirmPassword?.type === 'validate') {
            return 'Passwords must match'
        }
        return ''
      default:
        return ''
    }
  }