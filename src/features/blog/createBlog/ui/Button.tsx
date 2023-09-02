import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useState } from 'react'
import { CreateBlog } from '../CreateBlog.form'

interface ButtonProps {
	children: string
}

export function Button({ children }: ButtonProps) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setOpen(true)}>
				{children}
			</button>
			{open && (
				<Popup
					open={open}
					closeOnDocumentClick
					modal
					onClose={() => setOpen(false)}
					className="w-3/4 mx-auto">

					<CreateBlog />
				</Popup>
			)}
		</>
	)
}