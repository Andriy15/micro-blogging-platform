import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { User } from '@supabase/supabase-js'
import { notify } from '../../shared/notifyError'

export const useUser = () => {
	const [user, setUser] = useState<User | null>(null)

	async function getUser(): Promise<void> {
		try {
			const { data } = await supabase.auth.getUser()
			setUser(data.user || null)
		} catch (errorMessage) {
			const error = errorMessage as Error
			notify(error.message)
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				const currentUser = session?.user
				setUser(currentUser || null)
			}
		)
		return () => {
			authListener?.subscription?.unsubscribe()
		}
	}, [])

	return { user }
}
