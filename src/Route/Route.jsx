import { createBrowserRouter } from 'react-router';
import RootLayout from './../Root/RootLayout';
import Login from '../Shared/Login/Login';
import Register from '../Shared/Register/Register';
import Banner from '../Pages/Customer/Homepage/Banner';
import About from '../Shared/About/About';
import Contact from '../Shared/Contact/Contact';
import AllLoans from '../Pages/Customer/All Loan/AllLoans';
import LoanDetails from '../Pages/Customer/Loan Details/LoanDetails';

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
      },
      {
        path: "/contact",
        Component: Contact
      },
      {
        path: "/all-loans",
        Component: AllLoans
      },
      {
        path: "/all-loans/:id",
        Component: LoanDetails
      },
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