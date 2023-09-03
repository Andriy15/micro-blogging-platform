import { NavLayout } from '../features/layout/Nav.layout'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './HomePage'
import { Login } from '../features/auth/login/Login'
import { SignUp } from '../features/auth/sign-up/SignUp'
import { NotFound } from '../shared/error/404'
import { EmailConfirmPage } from './EmailConfirmPage'
import { AuthorsPage } from './AuthorsPage'
import { AuthorsBlog } from '../features/authors/AuthorsBlog'
import { useAuthorsEmail } from '../features/authors/context/AuthorsEmail.context'

export function Router() {
	const { authorsEmail } = useAuthorsEmail()

	return (
		<NavLayout>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/authors' element={<AuthorsPage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/confirm' element={<EmailConfirmPage />} />
				<Route path={`authors/${authorsEmail}`} element={<AuthorsBlog />} />
			</Routes>
		</NavLayout>
	)
}
