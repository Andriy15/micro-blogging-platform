import { useBlogs } from '../blog/createBlog/hooks/getBlogs'
import { Loader } from '../../shared/Loader'
import { Error } from '../../shared/error/Error'

export function AuthorsList() {
	const { blogs, loading, error } = useBlogs()

	if (loading) {
		return <Loader />
	}

	if (error) {
		return <Error error={error}	/>
	}

	const emailSet: Set<string> = new Set(blogs.map(blog => blog.email))

	const set = Array.from(emailSet)

		return (
			<div className='container mx-auto flex flex-col items-center max-w-2xl pt-5'>
				<h1 className='text-center text-stone-400 text-2xl'>Authots List</h1>
				{set.map((email: string) => (
					<div
						key={email}
						className='bg-white rounded-lg shadow-md p-8 w-96 text-center mb-4'
					>
						{email}
					</div>
				))}
			</div>
		)
}