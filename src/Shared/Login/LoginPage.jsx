import React, { useState, useContext } from 'react';
import { EyeIcon, EyeOffIcon, BookOpenIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Auth/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Firebase.init';

const LoginPage = () => {
  const { SignInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectByRole = (role) => {
    if (role === 'admin') navigate('/dashboard/admin/manage-users');
    else if (role === 'manager') navigate('/dashboard/manager');
    else navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);

    try {
      // ---------------- Admin Login ----------------
      const adminRes = await fetch('https://loan-link-loan-management-server.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (adminRes.ok) {
        const adminData = await adminRes.json();
        if (adminData.role === 'admin') {
          localStorage.setItem('role', 'admin');
          localStorage.setItem('token', adminData.token);
          toast.success('Logged in as Admin');
          redirectByRole('admin');
          setLoading(false);
          return;
        }
      }

      // ---------------- Firebase Login ----------------
      const result = await SignInUser(email, password);
      const firebaseUser = result.user;

      const res = await fetch(
        `https://loan-link-loan-management-server.vercel.app/users/by-email?email=${firebaseUser.email}`
      );

      let users = [];
      if (res.ok) users = await res.json();

      let role = users.length ? users[0].role : 'borrower';

      // Auto-create borrower if not exists
      if (!users.length) {
        await fetch('https://loan-link-loan-management-server.vercel.app/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: firebaseUser.displayName || 'Borrower',
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            role,
          }),
        });
      }

      localStorage.setItem('role', role);
      toast.success(`Logged in as ${role}`);
      redirectByRole(role);
    } catch (error) {
      console.error(error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const firebaseUser = result.user;

      const res = await fetch(
        `https://loan-link-loan-management-server.vercel.app/users/by-email?email=${firebaseUser.email}`
      );

      let users = [];
      if (res.ok) users = await res.json();

      let role = users.length ? users[0].role : 'borrower';

      if (!users.length) {
        await fetch('https://loan-link-loan-management-server.vercel.app/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            role,
          }),
        });
      }

      localStorage.setItem('role', role);
      toast.success(`Logged in as ${role}`);
      redirectByRole(role);
    } catch (error) {
      console.error(error);
      toast.error('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast.error('Enter your email first');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success('Password reset email sent');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
            onChange={(e) => setResetEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-600 font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn w-full mt-2 border border-gray-300 flex justify-center gap-2"
          >
            <BookOpenIcon size={18} />
            Login with Google
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default LoginPage;
