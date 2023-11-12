import React from 'react';
import { Button , TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../../supabaseClient';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../../shared/notifyError';
import { notifySuccess } from '../../../shared/notifySuccess';
import { getError } from '../model';
import { REGEX_PATTERNS } from '../constants';
import { Fields, FORM_LABELS } from '../constants';
import { LoginForm } from './Login.model';

export function Login() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginForm>();

	const navigate = useNavigate();

	const onSubmit = async (data: LoginForm): Promise<void> => {
		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});
		if (error) {
			notify(error.message);
		} else {
			notifySuccess('Logged in successfully');
			navigate('/');
		}
	}

	const onGoogleSubmit = async (): Promise<void> => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
			},
		})
		if (error) {
			notify(error.message);
		} else {
			notifySuccess('Logged in successfully');
			navigate('/');
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col justify-center items-center mt-5">
			<h1 className="text-5xl text-center">Log In</h1>
			<span className="text-center font-extralight text-lg block mt-4">
        Don't have an account?{' '}
				<Link to="/sign-up" className="text-blue-400">
          Sign Up
        </Link>
      </span>
			<div className="flex justify-center items-center mt-10">
				<form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
					<div className="flex flex-col w-[300px]">
						<TextField
							{...register('email', {
								required: true,
								pattern: REGEX_PATTERNS[Fields.email],
							})}
							label={FORM_LABELS[Fields.email]}
							fullWidth
							margin="normal"
							variant="outlined"
							className="mb-4"
						/>
						{errors.email && (
							<span className="text-red-400">{getError(Fields.email, errors)}</span>
						)}
						<TextField
							{...register('password', { required: true, minLength: 8 })}
							type="password"
							label={FORM_LABELS[Fields.password]}
							fullWidth
							margin="normal"
							variant="outlined"
							className="mb-4"
						/>
						{errors.password && (
							<span className="text-red-400">{getError(Fields.password, errors)}</span>
						)}
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Log In
						</Button>
					</div>

					<div className='border-l-2 text-black mx-4' />

					<div className="flex flex-col items-center justify-around w-[300px]">
						<Button
							variant="outlined"
							color="primary"
							fullWidth
							className="mb-4 h-14"
							onClick={onGoogleSubmit}
						>
							Sign In with Google
						</Button>
						<Button
							variant="outlined"
							color="primary"
							fullWidth
							className="mb-4 h-14"
						>
							Sign In with Facebook
						</Button>
					</div>
				</form>
			</div>
			<div className='text-black mx-4 mt-10'>
				<Button variant={'text'} color={'primary'} fullWidth>
					Log in without registration
				</Button>
			</div>
			<ToastContainer />
		</form>
	);
}
