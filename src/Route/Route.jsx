import { createBrowserRouter } from 'react-router';
import RootLayout from './../Root/RootLayout';
import Login from '../Shared/Login/Login';
import Register from '../Shared/Register/Register';
import Banner from '../Pages/Customer/Homepage/Banner';
import About from '../Shared/About/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        Component: Banner
      },

      {
        path: "/about",
        Component: About
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