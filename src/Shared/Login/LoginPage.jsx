import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: `Welcome back!`,
      confirmButtonColor: '#4f46e5',
    });
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl transition-colors">
        <h2 className="text-3xl font-extrabold text-center text-primary mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Log in to access your LoanLink dashboard
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full rounded-lg"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full rounded-lg"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-focus transition-all shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-lg border border-base-300 bg-base-100 font-semibold hover:bg-base-200 transition-all shadow-sm"
        >
          <FcGoogle size={20} />
          Log in with Google
        </button>

        <p className="text-center text-gray-500 mt-4">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
