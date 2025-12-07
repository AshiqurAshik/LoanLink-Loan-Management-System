import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Auth/AuthContext';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { SignInUser, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await SignInUser(data.email, data.password);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back!`,
        confirmButtonColor: '#4f46e5',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back!`,
        confirmButtonColor: '#4f46e5',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
      });
    }
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
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              className="input input-bordered w-full rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 mt-3 text-gray-500 hover:text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
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
