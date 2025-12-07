import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../Theme/ThemeToggle';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'All Loans', path: '/all-loans' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-primary hover:text-primary-focus transition-colors"
          >
            LoanLink
          </Link>
        </div>

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
        </div>

        {/* Desktop Right Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all shadow-sm"
          >
            Login
          </Link>
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
          <div className="flex flex-col space-y-2 mt-2">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              Login
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
