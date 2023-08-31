export enum Fields {
    email = 'email',
    password = 'password',
    confirmPassword = 'confirmPassword'
}

export const FORM_LABELS: Record<Fields, string> = {
    [Fields.email]: 'Email',
    [Fields.password]: 'Password',
    [Fields.confirmPassword]: 'Confirm password'
}