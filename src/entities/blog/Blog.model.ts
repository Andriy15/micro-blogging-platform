import { IComment } from '../../features/comments/Comment.model'

export interface IBlog {
	source: {
		id: string
		name: string
	}
	author: string
	title: string
	description: string
	url: string
	urlToImage: string
	publishedAt: string
	content: string
}