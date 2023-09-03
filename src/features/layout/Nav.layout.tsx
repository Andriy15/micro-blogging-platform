import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../entities/user/user.hook'
import { supabase } from '../../supabaseClient'
import { notify } from '../../shared/notifyError'
import { useRole } from '../auth/sign-up/context/Role.context'
import { NavLayoutProps } from './Nav.model'

export function NavLayout({ children }: NavLayoutProps) {
	const { user } = useUser()
	const { role } = useRole()

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			notify(error.message)
		}
	}

	return (
		<>
			<nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6'>
				<div className='flex items-center flex-shrink-0 text-white mr-6'>
					<Link to='/' className='font-semibold text-xl tracking-tight'>
						Micro-Blogging Platform
					</Link>
				</div>
				<div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
					<div className='text-sm lg:flex-grow'>
						{user ? (
							<>
								<Link
									to='/'
									className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'
								>
									Blogs
								</Link>

								<Link
									to='/authors'
									className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'
								>
									Authors
								</Link>

								<div className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'>
									{user.email}
								</div>

								<Link
									to='/'
									className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'
									onClick={handleLogout}
								>
									Logout
								</Link>

								{role === 'commentator' && (
									<span className='text-white'>Commentator</span>
								)}

								{role === 'author' && (
									<span className='text-white'>Author</span>
								)}
							</>
						) : (
							<>
								<Link
									to='/login'
									className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'
								>
									Login
								</Link>
								<Link
									to='/sign-up'
									className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4'
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
			<main>{children}</main>
		</>
	)
}
