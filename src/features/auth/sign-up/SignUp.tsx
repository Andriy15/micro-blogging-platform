import React, { useState } from 'react'
import {
	Button,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { supabase } from '../../../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { notify } from '../../../shared/notifyError'
import { notifySuccess } from '../../../shared/notifySuccess'
import { getError } from '../model'
import { Fields, REGEX_PATTERNS } from '../constants'
import { useRole } from './context/Role.context'
import { SignUpForm } from './SignUp.model'

export function SignUp() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		getValues
	} = useForm<SignUpForm>()

	const navigate = useNavigate()
	const { setRole } = useRole()
	const [roleState, setRoleState] = useState('')

	const onSubmit = async (data: SignUpForm): Promise<void> => {
		if(!roleState) {
			notify('Please choose your role')
			return
		}

		try {
			const response = await supabase.auth.signUp({
				email: data.email,
				password: data.password
			})

			if (response.error) {
				notify(response.error.message)
			} else {
				notifySuccess('Check your email for confirmation')
			}
			navigate('/confirm')
		} catch (error: any) {
			console.error('Sign up error:', error.message)
		}
	}

	return (
		<Container maxWidth='xs' className='mt-10'>
			<Typography variant='h4' align='center' gutterBottom>
				Sign Up
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					id='email'
					type='email'
					{...register('email', {
						required: true,
						pattern: REGEX_PATTERNS[Fields.email]
					})}
					variant='outlined'
					margin='normal'
					label='Email'
					className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500'
				/>
				{errors.email && (
					<span className='text-red-600'>{getError(Fields.email, errors)}</span>
				)}
				<TextField
					id='password'
					type='password'
					{...register('password', { required: true, minLength: 8, pattern: REGEX_PATTERNS[Fields.password] })}
					variant='outlined'
					margin='normal'
					label='Password'
					className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500'
				/>
				{errors.password && (
					<span className='text-red-600'>
						{getError(Fields.password, errors)}
					</span>
				)}
				<TextField
					id='confirmPassword'
					type='password'
					label='Confirm Password'
					{...register('confirmPassword', {
						required: true,
						validate: value =>
							value === getValues().password || 'Passwords do not match'
					})}
					variant='outlined'
					margin='normal'
					className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500'
				/>
				{errors.confirmPassword && (
					<span className='text-red-600'>
						{getError(Fields.confirmPassword, errors)}
					</span>
				)}
				<FormControl>
					<FormLabel id='demo-row-radio-buttons-group-label'>
						Choose your role
					</FormLabel>
					<RadioGroup
						row
						aria-labelledby='demo-row-radio-buttons-group-label'
						name='row-radio-buttons-group'
					>
						<FormControlLabel
							value='commentator'
							control={<Radio />}
							label='Commentator'
							onChange={() => {
								setRole('commentator')
								setRoleState('commentator')
							}}
						/>
						<FormControlLabel
							value='author'
							control={<Radio />}
							label='Author'
							onChange={() => {
								setRole('author')
								setRoleState('author')
							}}
						/>
					</RadioGroup>
				</FormControl>

				<Button type='submit' variant='outlined' color='primary' fullWidth>
					Sign Up
				</Button>
			</form>

			<ToastContainer />
		</Container>
	)
}
