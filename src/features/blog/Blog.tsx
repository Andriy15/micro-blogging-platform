import React, { useState } from 'react'
import { BlogProps } from './Blog.model'
import { CommentForm } from 'entities/comments/Comment.form'
import { CommentList } from 'entities/comments/Comment.list'
import { DateTime } from 'luxon'
import { useRole } from '../auth/sign-up/context/Role.context'
import { Role } from '../auth/sign-up/context/Role.constants'


export function Blog({ blog, onDropdownOpen }: BlogProps) {
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const { role } = useRole()

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen)
		onDropdownOpen()
	}

	return (
		<div className='bg-white rounded-lg shadow-md p-4 my-4 w-[500px] '>
			<p className='text-gray-400 mb-2'>Published at: {DateTime.fromISO(blog.published_at).toLocaleString(DateTime.DATE_MED)}</p>
			<img
				src={blog.urlimage}
				alt={blog.title}
				className='w-full h-auto rounded-lg mb-2'
			/>
			<h2 className='text-xl font-semibold mb-2'>{blog.title}</h2>
			<p className='text-gray-600 mb-2'>{blog.description}</p>
			<p className='text-gray-700 font-medium mb-1'>Email: {blog.email}</p>
			<a
				href={blog.url}
				target='_blank'
				rel='noopener noreferrer'
				className='text-blue-500 hover:underline mr-4'
			>
				Read more
			</a>
			<button
				className='transition hover:bg-blue-200 text-gray-500 font-bold py-2 px-4 rounded'
				onClick={toggleDropdown}
			>
				Comment
			</button>
			{dropdownOpen && (
				<div>
					<CommentList id={blog.id} />
					{role === Role.commentator && <CommentForm id={blog.id} />}
				</div>
			)}
		</div>
	)
}