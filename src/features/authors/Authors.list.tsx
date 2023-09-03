import { useBlogs } from '../blog/createBlog/hooks/getBlogs'
import { Loader } from '../../shared/Loader'
import { Error } from '../../shared/error/Error'
import { Link } from 'react-router-dom'
import { useAuthorsEmail } from './context/AuthorsEmail.context'

export function AuthorsList() {
	const { blogs, loading, error } = useBlogs()
	const { setAuthorsEmail } = useAuthorsEmail()

	if (loading) {
		return <Loader />
	}

	if (error) {
		return <Error error={error} />
	}

	const set: Set<string> = new Set(blogs.map(blog => blog.email))

	const emailSet = Array.from(set)

	return (
		<div className='container mx-auto flex flex-col items-center max-w-2xl pt-5'>
			<h1 className='text-center text-stone-400 text-2xl'>Authors List</h1>
			{emailSet.map((email: string) => (
				<Link
					to={`/authors/${email}`}
					key={email}
					className='bg-white rounded-lg shadow-md p-8 w-96 text-center mb-4'
					onClick={() => setAuthorsEmail(email)}
				>
					{email}
				</Link>
			))}
		</div>
	)
}
