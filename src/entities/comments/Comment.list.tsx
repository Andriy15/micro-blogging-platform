import React from 'react'
import { Comment } from './Comment'
import { useComment } from './hooks/Comments.hook'
import { IBlog } from '../../features/blog/Blog.model'

interface BlogProps {
	id: IBlog['id']
}

export function CommentList({ id }: BlogProps) {
	const { comments } = useComment(id)

	return (
		<div className='space-y-4'>
			{comments.length === 0 ? (
				<>
					<p className='text-gray-600'>No comments yet</p>
				</>
			) : (
				<>
					{comments.map(comment => (
						<Comment key={comment.id} comment={comment} />
					))}
				</>
			)}
		</div>
	)
}
