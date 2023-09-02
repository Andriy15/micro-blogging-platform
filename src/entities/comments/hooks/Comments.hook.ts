import { IComment } from '../Comment.model'
import { useEffect, useState } from 'react'
import { supabase } from '../../../features/config/supabaseClient'

export function useComment(id: number) {
	const [comments, setComments] = useState<IComment[]>([])

	async function getComments() {
		try {
			let { data, error } = await supabase
				.from('comments')
				.select('*')
				.eq('blog_id', id)

			if (error) throw error

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


