import React from 'react'
import { Comment } from './Comment'
import { IComment } from './Comment.model'
import { useComment } from './hooks/comments.hook'

export function CommentList() {
	const { comments } = useComment()

	return (
		<div className='space-y-4'>
			{comments.map(comment => (
				<Comment comment={comment} />
			))}
		</div>
	)
}
