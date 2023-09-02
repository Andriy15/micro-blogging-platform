import React from 'react'
import { Comment } from './Comment'
import { useComment } from './hooks/Comments.hook'

export function CommentList() {
	const { comments } = useComment()

	return (
		<div className='space-y-4'>
			{comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
		</div>
	)
}
