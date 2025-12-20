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
      // 1️⃣ Create user in Firebase
      await createUser(data.email, data.password);
      await addProfileInfo(data.name, data.photoURL);

      // 2️⃣ Save user to MongoDB (PUBLIC ROUTE)
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password, // ✅ REQUIRED
          role: data.role,         // borrower | manager
          photoURL: data.photoURL,
        }),
      });

      if (!res.ok) {
        throw new Error('MongoDB registration failed');
      }

      // 3️⃣ Logout to prevent auto-login
      await signOut(auth);

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
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-primary mb-4">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <input
            className="input input-bordered w-full"
            placeholder="Full Name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          {/* Email */}
          <input
            className="input input-bordered w-full"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
          />

          {/* Photo */}
          <input
            className="input input-bordered w-full"
            placeholder="Photo URL"
            {...register('photoURL')}
          />

          {/* Role */}
          <select
            className="select select-bordered w-full"
            {...register('role', { required: 'Role is required' })}
          >
            <option value="">Select Role</option>
            <option value="borrower">Borrower</option>
            <option value="manager">Manager</option>
          </select>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="input input-bordered w-full"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Min 6 characters' },
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="btn btn-primary w-full">Sign Up</button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
