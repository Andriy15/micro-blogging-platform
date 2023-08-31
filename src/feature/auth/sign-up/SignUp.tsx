import React from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { supabase } from "../../../supabaseClient";
import { useNavigate } from "react-router-dom";

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUp() {
  const { handleSubmit, register, formState: { errors }, getValues,} = useForm<SignUpForm>()

  const navigate = useNavigate()

  const onSubmit = async (data: SignUpForm) => {
    try {
      const response = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })
  
      if (response.error) {
        alert(response.error.message);
      } else {
        alert("Sign up successful!")
      }
      navigate('/')

    } catch (error: any) {
      console.error("Sign up error:", error.message);
    }
  }
  

  return (
    <Container maxWidth="xs" className="mt-10">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="email"
          type="email"
          {...register("email", { required: true })}
          variant="outlined"
          margin="normal"
          label="Email"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <span className="text-red-600">This field is required</span>
        )}
        <TextField
          id="password"
          type="password"
          {...register("password", { required: true, minLength: 8 })}
          variant="outlined"
          margin="normal"
          label="Password"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        {errors.password?.type === "required" && (
          <span className="text-red-600">This field is required</span>
        )}
        {errors.password?.type === "minLength" && (
          <span className="text-red-600">Min length is 8 symbols</span>
        )}
        <TextField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === getValues().password || "Passwords do not match",
          })}
          variant="outlined"
          margin="normal"
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        />
        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}
        <Button type="submit" variant="text" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
}
