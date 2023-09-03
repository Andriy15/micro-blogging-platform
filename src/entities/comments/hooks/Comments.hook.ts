import { IComment } from '../Comment.model'
import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { IBlog } from '../../../features/blog/Blog.model'
import { notify } from '../../../shared/notifyError'

export function useComment(id: IBlog['id']) {
	const [comments, setComments] = useState<IComment[]>([])

	async function getComments() {
		try {
			let { data, error } = await supabase
				.from('comments')
				.select('*')
				.eq('blog_id', id)

			if (error) {
				notify(error.message)
			}

			if (data !== null) {
				setComments(data)
			}
		} catch (error) {
			console.error('Error in getComments:', error)
		}
	}

	useEffect(() => {
		getComments()
	}, [id])

	return { comments }
}


