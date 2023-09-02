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

export const REGEX_PATTRERNS = {
	DIGITS: /^(?=.*[0-9])/,
	LOWERCASE_LETTER: /[a-z]/,
	UPPERCASE_LETTER: /[A-Z]/,
	SPECIAL_CHARACTER: /[^A-Za-z0-9]/
}

