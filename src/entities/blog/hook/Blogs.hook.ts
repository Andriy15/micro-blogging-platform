import { useState, useEffect } from 'react'
import { IBlog } from '../Blog.model'

export function useBlogs() {
	const [blogs, setBlogs] = useState<IBlog[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function getBlogs(): Promise<void> {
		try {
			setError('')
			setLoading(true)
			const response = await fetch(
				'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=b63b6269a1d8451091748df7e17a9e31'
			)
			const data = await response.json()

			if (data.articles) {
				const mappedBlogs = data.articles.map((article: any) => ({
					source: {
						id: article.source.id,
						name: article.source.name
					},
					author: article.author,
					title: article.title,
					description: article.description,
					url: article.url,
					urlToImage: article.urlToImage,
					publishedAt: article.publishedAt,
					content: article.content
				}))
				setBlogs(mappedBlogs)
			}
		} catch (errorMessage) {
			const error = errorMessage as Error
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getBlogs()
	}, [])

	return { blogs, loading, error }
}
