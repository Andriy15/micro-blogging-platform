import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export function CommentForm() {
	const [comment, setComment] = useState('')
	const [author, setAuthor] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (comment.trim() === '') {
			return
		}

		const { data, error } = await supabase
			.from('comments')
			.insert([{ text: comment, author: author }])

		if (error) {
			console.error('Error adding comment:', error)
			return
		}

		setComment('')
	}

	return (
		<div className='bg-white rounded-lg shadow-md p-4 my-4'>
			<form className='flex flex-col'>
				<label htmlFor='comment' className='text-gray-700 font-medium mb-1'>
					Comment
				</label>
				<input
					type='text'
					name='author'
					className='border border-gray-300 rounded-lg p-2 mb-2'
					placeholder='Author'
					onChange={e => setAuthor(e.target.value)}
				/>
				<textarea
					name='comment'
					className='border border-gray-300 rounded-lg p-2 mb-2'
					placeholder='Comment'
					onChange={e => setComment(e.target.value)}
				/>
				<button
					className='hover:bg-blue-200 text-gray-500 font-bold py-2 px-4 rounded'
					type='submit'
				>
					Submit
				</button>
			</form>
		</div>
	)
}
