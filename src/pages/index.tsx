import { NavLayout } from '../features/layout/NavLayout'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './HomePage'
import { Login } from '../features/auth/login/Login'
import { SignUp } from '../features/auth/sign-up/SignUp'
import { NotFound } from '../shared/error/404'
import { EmailConfirmPage } from './EmailConfirmPage'


export function Router() {
	return (
		<NavLayout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/confirm" element={<EmailConfirmPage />} />
			</Routes>
		</NavLayout>
	)
}