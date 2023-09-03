import { useEffect, useState } from 'react'
import { supabase } from '../../../../supabaseClient'
import { notify } from '../../../../shared/notifyError'
import { IBlog } from '../../Blog.model'

export function useBlogs() {
	const [blogs, setBlogs] = useState<IBlog[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	async function getBlogs(): Promise<void> {
		try {
			setLoading(true)
			const { data, error } = await supabase.from('blogs').select('*')

			if (error) {
				notify(error.message)
			}

			if (data) {
				setBlogs(data)
			}
			setError(null)
			setLoading(false)
		} catch (errorMessage) {
			const error = errorMessage as Error
			notify(error.message)
		}
	}

	useEffect(() => {
		getBlogs()
	}, [])

	return { blogs, loading, error }
}
