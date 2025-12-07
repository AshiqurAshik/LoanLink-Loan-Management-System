import { createBrowserRouter } from 'react-router';
import Home from '../Pages/Customer/Homepage/Home';
import RootLayout from './../Root/RootLayout';
import Login from '../Shared/Login/Login';
import Register from '../Shared/Register/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        Component: Home
      }
    ]
  },

  {
    path: "/login",
    Component: Login
  },

  {
    path: "/register",
    Component: Register
  }
]);