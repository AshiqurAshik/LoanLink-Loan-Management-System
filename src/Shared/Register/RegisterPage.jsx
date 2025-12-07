import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Auth/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const { createUser, addProfileInfo } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUser(data.email, data.password);
      await addProfileInfo(data.name, data.photoURL);
      await signOut(auth); // prevent auto-login

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: `Welcome ${data.name}! You can now log in.`,
        confirmButtonColor: '#4f46e5',
      });

      reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl transition-colors">
        <h2 className="text-3xl font-extrabold text-center text-primary mb-4">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to start using LoanLink
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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

          {/* Photo URL */}
          <div>
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register('photoURL')}
            />
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
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
                validate: {
                  hasUpper: (value) =>
                    /[A-Z]/.test(value) || 'Must have an uppercase letter',
                  hasLower: (value) =>
                    /[a-z]/.test(value) || 'Must have a lowercase letter',
                },
              })}
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
