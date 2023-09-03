export interface IBlog {
	id: number;
	email: string
	title: string
	description: string
	url: string
	urlimage: string
	published_at: string
	content: string
}

export interface BlogProps {
	blog: IBlog
	onDropdownOpen: () => void
}
