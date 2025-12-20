import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../Theme/ThemeToggle';
import { AuthContext } from '../../Auth/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);
  const dropdownRef = useRef();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      await signOutUser();
      setDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'All Loans', path: '/all-loans' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300 shadow-sm">
      <div className="w-11/12 mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-primary hover:text-primary-focus transition-colors"
        >
          LoanLink
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-10 text-base font-medium">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive
                    ? 'text-primary font-semibold underline underline-offset-4'
                    : 'text-gray-700 hover:text-primary hover:underline hover:underline-offset-4'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/borrower"
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive
                    ? 'text-primary font-semibold underline underline-offset-4'
                    : 'text-gray-700 hover:text-primary hover:underline hover:underline-offset-4'
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Desktop Right Buttons */}
        <div className="hidden lg:flex items-center space-x-3 relative">
          <ThemeToggle />
          {user ? (
            <>
              <img
                src={user.photoURL || 'https://via.placeholder.com/40'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-300 shadow-sm cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-12 right-0 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50"
                >
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {user.displayName || 'User Name'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                  </p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="ml-3 text-2xl focus:outline-none text-gray-700 hover:text-primary transition-colors"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 pb-4 space-y-3 text-base font-medium bg-base-100 border-t border-base-300">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive
                    ? 'text-primary font-semibold underline underline-offset-4'
                    : 'text-gray-700 hover:text-primary hover:underline hover:underline-offset-4'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/borrower"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive
                    ? 'text-primary font-semibold underline underline-offset-4'
                    : 'text-gray-700 hover:text-primary hover:underline hover:underline-offset-4'
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          <div className="flex flex-col space-y-2 mt-2">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
