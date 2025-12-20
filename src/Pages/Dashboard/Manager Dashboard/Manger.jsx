import React, { useState, useEffect } from 'react';
import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router';
import {
  FaUserCircle,
  FaBars,
  FaTasks,
  FaCheck,
  FaPlus,
  FaFileAlt,
  FaAngleDown,
} from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase.init';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';

const Manager = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [loanMenuOpen, setLoanMenuOpen] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Auth check
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedName = localStorage.getItem('name');
    if (storedRole === 'manager')
      setUser({ role: 'manager', name: storedName });
  }, []);

  // Close sidebar on mobile on route change
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    localStorage.clear();
    try {
      signOut(auth);
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!user || user.role !== 'manager') {
    return (
      <ErrorPage></ErrorPage>
    );
  }

  const managerChildren = [
    { path: '/dashboard/manager', label: 'Add Loan', icon: <FaPlus /> },
    {
      path: '/dashboard/manager/approve-application',
      label: 'Approve Application',
      icon: <FaCheck />,
    },
    {
      path: '/dashboard/manager/manage-loan',
      label: 'Manage Loans',
      icon: <FaTasks />,
    },
    {
      path: '/dashboard/manager/pending-application',
      label: 'Pending Applications',
      icon: <FaFileAlt />,
    },
    {
      path: '/dashboard/manager/manager-profile',
      label: 'Profile',
      icon: <FaUserCircle />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-white shadow-xl transition-transform duration-300
          ${
            sidebarOpen
              ? 'translate-x-0 w-64'
              : '-translate-x-full w-64 md:w-20'
          }
          md:relative md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b">
          <span
            className={`text-2xl font-bold text-primary transition-all duration-300 overflow-hidden whitespace-nowrap
              ${
                sidebarOpen
                  ? 'opacity-100 max-w-full p-2'
                  : 'opacity-0 max-w-0 p-0'
              }`}
          >
            LoanLink
          </span>
        </div>

        {/* Manager Menu */}
        <nav className="flex-1 p-4">
          <div>
            <button
              onClick={() => setLoanMenuOpen(!loanMenuOpen)}
              className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition"
            >
              <span className="flex items-center gap-3">
                <FaTasks />
                {sidebarOpen && (
                  <span className="font-medium">Loan Management</span>
                )}
              </span>
              {sidebarOpen && (
                <FaAngleDown
                  className={`transition-transform ${
                    loanMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>

            {loanMenuOpen && (
              <div className="ml-6 mt-2 flex flex-col gap-2">
                {managerChildren.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard/manager'}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`
                    }
                  >
                    {item.icon}
                    {sidebarOpen && <span>{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle */}
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none md:hidden"
              onClick={toggleSidebar}
            >
              <FaBars size={22} />
            </button>

            <h1 className="text-xl font-bold text-gray-800 truncate">
              {managerChildren.find((c) => location.pathname.startsWith(c.path))
                ?.label || 'Manager Panel'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaUserCircle size={24} className="text-gray-700" />
              <span className="hidden sm:inline font-medium text-gray-700">
                {user?.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline btn-error"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Manager;
