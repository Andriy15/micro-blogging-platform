import React from 'react'
import { IComment } from './Comment.model'

interface CommentProps {
	comment: IComment
}

export function Comment({ comment }: CommentProps) {
	return (
		<div className='bg-gray-100 p-4 rounded-lg'>
			<p className='text-gray-700 font-medium mb-1'>{comment.email}</p>
			<p className='text-gray-700 mb-2'>{comment.text}</p>
		</div>
	)
}
