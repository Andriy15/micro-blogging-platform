import React from 'react'
import { Button, Container, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { supabase } from '../../../supabaseClient'
import { ToastContainer } from 'react-toastify'
import { notify } from '../../../shared/notifyError'
import { notifySuccess } from '../../../shared/notifySuccess'
import { getError } from '../auth.model'
import { REGEX_PATTRERNS } from '../auth.constants'
import { Fields, FORM_LABELS } from '../auth.constants'

interface LoginForm {
	email: string
	password: string
}

export function Login() {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<LoginForm>()

	const navigate = useNavigate()

	const onSubmit = async (data: LoginForm): Promise<void> => {
		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password
		})
		if (error) {
			notify(error.message)
		} else {
			notifySuccess('Logged in successfully')
			navigate('/')
		}
	}

	return (
		<Container maxWidth='xs' className='mt-10'>
			<Typography variant='h4' align='center' gutterBottom>
				Login
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					{...register('email', {
						required: true,
						pattern: REGEX_PATTRERNS.SPECIAL_CHARACTER
					})}
					label={FORM_LABELS[Fields.email]}
					fullWidth
					margin='normal'
					variant='outlined'
				/>
				{errors.email && (
					<span className='text-red-400'>{getError(Fields.email, errors)}</span>
				)}
				<TextField
					{...register('password', { required: true, minLength: 8 })}
					type='password'
					label={FORM_LABELS[Fields.password]}
					fullWidth
					margin='normal'
					variant='outlined'
				/>
				{errors.password && (
					<span className='text-red-400'>
						{getError(Fields.password, errors)}
					</span>
				)}
				<Button type='submit' variant='text' color='primary' fullWidth>
					Log In
				</Button>
			</form>
			<Typography variant='body2' align='center'>
				Don't have an account?{' '}
				<Link component={RouterLink} to='/sign-up'>
					Sign Up
				</Link>
			</Typography>

			<ToastContainer />
		</Container>
	)
}
