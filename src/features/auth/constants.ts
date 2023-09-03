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

export const REGEX_PATTERNS = {
	[Fields.email]: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
	[Fields.password]: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
}

