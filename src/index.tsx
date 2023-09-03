import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/index.css'
import App from './app/App'
import { RoleState } from './features/auth/sign-up/context/Role.context'
import { AuthorsEmailState } from './features/authors/context/AuthorsEmail.context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<>
		<AuthorsEmailState>
			<RoleState>
				<App />
			</RoleState>
		</AuthorsEmailState>
	</>
)
