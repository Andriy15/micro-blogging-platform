import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../feature/auth/hooks/user.hook'
import { Blog } from '../feature/blog/Blog'
import { useBlogs } from '../feature/service/blogs.service'
import { Loader } from '../shared/Loader'
import { notify } from '../shared/notifyError'
import { Error } from '../shared/error/Error'
import { toast, ToastContainer } from 'react-toastify'

export function Home() {
	const { user } = useUser()
	const { blogs, loading, error } = useBlogs()

	return (
		<>
			{user ? (
				<div className='container mx-auto flex flex-col items-center max-w-2xl pt-5'>
					{loading && <Loader />}

					{error &&
						toast.error(<Error error={error} />, {
							position: 'top-right',
							autoClose: 7000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined
						})}

					{blogs.map(blog => (
						<Blog key={blog.title} blog={blog} />
					))}

					<ToastContainer />
				</div>
			) : (
				<div className='flex flex-col items-center'>
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
