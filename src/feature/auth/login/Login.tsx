import React from 'react';
import { Button, Container, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../../shared/notifyError';
import { notifySuccess } from '../../../shared/notifySuccess';
import { getError } from '../auth.module';


interface LoginForm {
  email: string;
  password: string;
}

export function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm<LoginForm>()

  const navigate = useNavigate()

  const onSubmit = async (data: LoginForm) => {
    const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
        })
    if (error) {
      notify(error.message)
    } else {
        notifySuccess('Logged in successfully')
        navigate('/')
    }
}

  return (
    <Container maxWidth="xs" className="mt-10">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email', { required: true, pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/ })}
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {errors.email && <span className='text-red-400'>{getError('email', errors)}</span>}
        <TextField
          {...register('password', { required: true, minLength: 8 })}
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {errors.password && <span className='text-red-400'>{getError('password', errors)}</span>}
        <Button type="submit" variant="text" color="primary" fullWidth>
          Log In
        </Button>
      </form>
      <Typography variant="body2" align="center">
        Don't have an account?{' '}
        <Link component={RouterLink} to="/sign-up">
          Sign Up
        </Link>
      </Typography>

      <ToastContainer />

    </Container>
  );
}
