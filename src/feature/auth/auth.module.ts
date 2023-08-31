export const getError = (field: string, errors: any) => {
    switch (field) {
      case 'email':
        if (errors.email?.type === 'required') {
          return 'This field is required'
        }
        if (errors.email?.type === 'pattern') {
          return 'This field must be an email'
        }
        return ''
      case 'password':
        if (errors.password?.type === 'required') {
          return 'This field is required'
        }
        if (errors.password?.type === 'minLength') {
          return 'Min length is 8 symbols'
        }
        break
      case 'confirmPassword':
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