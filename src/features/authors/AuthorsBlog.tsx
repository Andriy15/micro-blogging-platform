import { useBlogs } from '../blog/createBlog/hooks/getBlogs'
import { useAuthorsEmail } from './context/AuthorsEmail.context'
import { Blog } from '../blog/Blog'
import { useState } from 'react'

export function AuthorsBlog() {
	const { blogs } = useBlogs()

	const { authorsEmail } = useAuthorsEmail()

	const [dropdownOpen, setDropdownOpen] = useState(false)

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen)
	}

	const authorsBlogs = blogs.filter(blog => blog.email === authorsEmail)

	return (
		<div className='container mx-auto flex flex-col items-center max-w-2xl pt-5'>
			<h1 className='text-center text-stone-400 text-2xl'>Authors Blog</h1>
			{authorsBlogs.map(blog => (
				<Blog key={blog.id} onDropdownOpen={toggleDropdown} blog={blog} />
			))}
		</div>
	)
}
