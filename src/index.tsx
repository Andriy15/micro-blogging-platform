import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/index.css'
import App from './app/App'
import { RoleState } from './features/auth/sign-up/context/Role.context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
		<RoleState>
			<App />
		</RoleState>
)
