import React, { useContext, useState } from 'react'
import { createContext } from 'react'


interface AuthorsEmailContextProps {
	authorsEmail: string
	setAuthorsEmail: (email: string) => void
}

export const AuthorsEmailContext = createContext<AuthorsEmailContextProps>({
	authorsEmail: '',
	setAuthorsEmail: () => {}
})

export function AuthorsEmailState({ children }: { children: React.ReactNode }) {
	const [authorsEmail, setAuthorsEmail] = useState(localStorage.getItem('authorsEmail') || '')

	const setAuthorsEmailContext = (email: string) => {
		setAuthorsEmail(email)
		localStorage.setItem('authorsEmail', email)
	}


	return (
		<AuthorsEmailContext.Provider value={{ authorsEmail, setAuthorsEmail: setAuthorsEmailContext }}>
			{children}
		</AuthorsEmailContext.Provider>
	)
}

export const useAuthorsEmail = () => {
  const { authorsEmail, setAuthorsEmail } =	useContext(AuthorsEmailContext)

	return { authorsEmail, setAuthorsEmail }
}