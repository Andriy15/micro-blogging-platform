import { IComment } from '../Comment.model'
import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'

export function useComment() {
	const [comments, setComments] = useState<IComment[]>([])

	async function getComments() {
		try {
			let { data, error } = await supabase
				.from('comments')
				.select('*')

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
	}, [])

	return { comments }
}


