import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (role) {
      setUser({ role, name, email });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <Outlet />
    </div>
  );
};

export default Dashboard;
