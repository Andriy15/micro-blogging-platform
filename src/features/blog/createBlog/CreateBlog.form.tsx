import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { supabase } from '../../config/supabaseClient'
import { notify } from '../../../shared/notifyError'
import { useUser } from '../../../entities/user/user.hook'

export function CreateBlog() {
	const { handleSubmit, register, formState: { errors } } = useForm()
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [description, setDescription] = useState('')
	const [urlImage, setUrlImage] = useState('')
	const [url, setUrl] = useState('')

	const { user } = useUser()

	const onSubmit = async (): Promise<void> => {
		if (!title || !content || !description || !urlImage || !url) {
			notify('Please fill in all fields')
			return
		}
		try {
			const { data, error } = await supabase
				.from('blogs')
				.insert({ title: title, content: content, email: user?.email, published_at: new Date(), description: description, urlimage: urlImage, url: url })
				.single()
			if (error) {
				notify(error.message)
			}
			window.location.reload()

			setTitle('')
			setContent('')
			setDescription('')
			setUrlImage('')
			setUrl('')
		} catch (error) {
			console.error('Error submitting blog:', error)
		}
	}

	return (
		<div className='bg-white rounded-lg shadow-md p-4 my-4' style={{ maxHeight: '600px', overflowY: 'auto' }}>
			<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='title' className='text-gray-700 font-medium mb-1'>
					Title
				</label>
				<input
					type='text'
					className='border border-gray-300 rounded-lg p-2 mb-2'
					placeholder='Title'
					{...register('title', { required: true })}
					onChange={e => setTitle(e.target.value)}
				/>
				{errors.title && (
					<span className='text-red-400'>Please enter a title</span>
				)}
				<label htmlFor='content' className='text-gray-700 font-medium mb-1'>
					Content
				</label>
				<textarea
					className='border border-gray-300 rounded-lg p-2 mb-2'
					placeholder='Content'
					{...register('content', { required: true })}
					onChange={e => setContent(e.target.value)}
				/>
				{errors.content && (
					<span className='text-red-400'>Please enter content</span>
				)}
				<label htmlFor='description' className='text-gray-700 font-medium mb-1'>
					Description
				</label>
				<input
					type='text'
					className='border border-gray-300 rounded-lg p-2 mb-2'
					placeholder='Description'
					{...register('description', { required: true })}
					onChange={e => setDescription(e.target.value)}
				/>
				{errors.description && (
					<span className='text-red-400'>Please enter a description</span>
				)}
				<label htmlFor='urlImage' className='text-gray-700 font-medium mb-1'>
					Url Image
				</label>
				<input
					type='text'
					className='border border-gray-300 rounded-lg p-2 mb-2'
					placeholder='Url Image'
					{...register('urlImage', { required: true })}
					onChange={e => setUrlImage(e.target.value)}
				/>
				{errors.urlImage && (
					<span className='text-red-400'>Please enter a urlImage</span>
				)}
				<label htmlFor='url' className='text-gray-700 font-medium mb-1'>
					Url
				</label>
				<input
					type='text'
					className='border border-gray-300 rounded-lg p-2 mb-2'
					placeholder='Url'
					{...register('url', { required: true })}
					onChange={e => setUrl(e.target.value)}
				/>
				{errors.url && (
					<span className='text-red-400'>Please enter a url</span>
				)}
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Submit
				</button>
			</form>
		</div>
	)
}