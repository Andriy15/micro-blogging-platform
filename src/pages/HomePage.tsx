import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../entities/user/user.hook'
import { Button } from '../features/blog/createBlog/ui/Button'
import { BlogList } from '../features/blog/Blog.list'
import { useRole } from '../features/auth/sign-up/context/Role.context'

export function HomePage() {
	const { user } = useUser()

	const { role } = useRole()

	return (
		<>
			{user ? (
				<div className='container mx-auto flex flex-col items-center max-w-2xl pt-5'>
					<BlogList />

					{role === 'author' && (
						<div className='fixed bottom-10 right-10'>
							<Button>Create new Blog</Button>
						</div>
					)}
				</div>
			) : (
				<div className='flex flex-col items-center mt-4'>
					<h1 className='text-3xl font-bold mb-4'>
						Welcome to Our Micro-Blogging Platform
					</h1>
					<p className='text-lg text-gray-600 mb-6'>
						Share your thoughts and connect with others!
					</p>
					<nav>
						<ul className='flex space-x-4'>
							<li>
								<Link
									to='/login'
									className='text-blue-500 hover:underline transition duration-300 ease-in-out'
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									to='/sign-up'
									className='text-blue-500 hover:underline transition duration-300 ease-in-out'
								>
									Sign Up
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			)}
		</>
	)
}
