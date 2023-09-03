import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useForm } from 'react-hook-form'
import { notify } from '../../shared/notifyError'
import { IBlog } from '../../features/blog/Blog.model'
import { useUser } from '../user/user.hook'

interface CommentFormProps {
	id: IBlog['id']
}

export function CommentForm({ id }: CommentFormProps) {
	const [comment, setComment] = useState('')
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm()

	const { user } = useUser()


	const onSubmit = async () => {
		try {
			const { error } = await supabase
				.from('comments')
				.insert({ text: comment, email: user?.email, blog_id: id })
				.single()

			error && notify(error.message)

			window.location.reload()

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
