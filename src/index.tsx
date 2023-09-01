import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { RoleState } from './feature/auth/sign-up/context/Role.context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<BrowserRouter>
		<RoleState>
			<App />
		</RoleState>
	</BrowserRouter>
)
