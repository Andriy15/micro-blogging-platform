import React, { useState } from 'react'
import { supabase } from '../config/supabaseClient'
import { useForm } from 'react-hook-form'

interface CommentForm {
	author: string
	text: string
}

export function CommentForm() {
	const [comment, setComment] = useState('')
	const [author, setAuthor] = useState('')
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm()

	const generateNumberId = () => {
		return Math.floor(Math.random() * 1000000)
	}

	const onSubmit = async () => {
		try {
			const { data, error } = await supabase
				.from('comments')
				.insert({id: generateNumberId(), text: comment, author: author })
				.single()

			if (error) {
				throw error
			}

			window.location.reload()

			setAuthor('')
			setComment('')
		} catch (error) {
			console.error('Error submitting comment:', error)
		}
	}

	return (
		<div className='bg-white rounded-lg shadow-md p-4 my-4'>
			<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='comment' className='text-gray-700 font-medium mb-1'>
					Comment
				</label>
				<input
					type='text'
					className='border border-gray-300 rounded-lg p-2 mb-2'
					placeholder='Author'
					{...register('author', { required: true })}
					onChange={e => setAuthor(e.target.value)}
				/>
				{errors.author && (
					<span className='text-red-400'>Please enter an author</span>
				)}
				<textarea
					className='border border-gray-300 rounded-lg p-2 mb-2'
					placeholder='Comment'
					{...register('comment', { required: true })}
					onChange={e => setComment(e.target.value)}
				/>
				{errors.comment && (
					<span className='text-red-400'>Please enter a comment</span>
				)}
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
