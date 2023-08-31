import React from 'react';
import { Button, Container, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import { toast, ToastContainer } from 'react-toastify';


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
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      })
    } else {
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
          {...register('email', { required: true })}
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {errors.email?.type === "required" && <span className='text-red-400'>This field is required</span>}
        <TextField
          {...register('password', { required: true, minLength: 8 })}
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {errors.password?.type === "required" && <span className='text-red-400'>This field is required</span>}
        {errors.password?.type === 'minLength' && <span className='text-red-400'>Min length is 8 symbols</span>}
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
