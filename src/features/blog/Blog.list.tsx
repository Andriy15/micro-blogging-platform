import { Loader } from '../../shared/Loader'
import { toast, ToastContainer } from 'react-toastify'
import { Error } from '../../shared/error/Error'
import { Blog } from './Blog'
import React, { useState } from 'react'
import { useBlogs } from './createBlog/hooks/getBlogs'

export function BlogList() {
	const { blogs, loading, error } = useBlogs()
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const onDropdownOpen = () => {
		setDropdownOpen(true)
	}

	return (
		<>
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
					<Blog
						key={blog.title}
						blog={blog}
						onDropdownOpen={onDropdownOpen}
					/>
				)
			)}

			<ToastContainer />
		</>
	)
}