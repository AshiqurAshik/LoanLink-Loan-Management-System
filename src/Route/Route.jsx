import { createBrowserRouter } from 'react-router';
import RootLayout from '../Root/RootLayout';
import Login from '../Shared/Login/Login';
import Register from '../Shared/Register/Register';
import About from '../Shared/About/About';
import Contact from '../Shared/Contact/Contact';
import AllLoans from '../Pages/Customer/All Loan/AllLoans';
import LoanDetails from '../Pages/Customer/Loan Details/LoanDetails';
import Home from '../Pages/Customer/Homepage/Home';
import ApplyLoan from '../Pages/Borrower/Apply Loan/ApplyLoan';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Admin from '../Pages/Dashboard/Admin Dashboard/Admin';
import ManageUser from '../Pages/Dashboard/Admin Dashboard/ManageUser';
import AdminAllLoan from '../Pages/Dashboard/Admin Dashboard/AdminAllLoan';
import AdminLoanApply from '../Pages/Dashboard/Admin Dashboard/AdminLoanApply';
import Manager from '../Pages/Dashboard/Manager Dashboard/Manger';
import ManagerAddLoan from '../Pages/Dashboard/Manager Dashboard/ManagerAddLoan';
import ManagerApproveApp from '../Pages/Dashboard/Manager Dashboard/ManagerApproveApp';
import ManagerManageLoan from '../Pages/Dashboard/Manager Dashboard/ManagerManageLoan';
import ManagerPendingApp from '../Pages/Dashboard/Manager Dashboard/ManagerPendingApp';
import ManagerProfile from '../Pages/Dashboard/Manager Dashboard/ManagerProfile';
import Borrower from './../Pages/Dashboard/Borrower Dasboard/Borrower';
import BorrowerProfile from '../Pages/Dashboard/Borrower Dasboard/BorrowerProfile';
import MyLoans from './../Pages/Dashboard/Borrower Dasboard/MyLoans';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/all-loans', element: <AllLoans /> },
      { path: '/all-loans/:id', element: <LoanDetails /> },
      { path: '/apply-loan/:id', element: <ApplyLoan /> },
    ],
  },

  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/borrower',
    element: <Borrower></Borrower>,
  },
  {
    path: '/my-loans',
    element: <MyLoans></MyLoans>,
  },
  {
    path: '/borrower-profile',
    element: <BorrowerProfile></BorrowerProfile>,
  },

  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      // ✅ Admin Panel (parent)
      {
        path: 'admin',
        element: <Admin />,
        children: [
          { index: true, element: <ManageUser /> },
          { path: 'manage-users', element: <ManageUser /> },
          { path: 'all-loans', element: <AdminAllLoan /> },
          { path: 'loan-applications', element: <AdminLoanApply /> },
        ],
      },

      // ✅ Manager Panel
      {
        path: 'manager',
        element: <Manager />,
        children: [
          { index: true, element: <ManagerAddLoan></ManagerAddLoan> },
          { path: 'add-loan', element: <ManagerAddLoan></ManagerAddLoan> },
          {
            path: 'approve-application',
            element: <ManagerApproveApp></ManagerApproveApp>,
          },
          {
            path: 'manage-loan',
            element: <ManagerManageLoan></ManagerManageLoan>,
          },
          {
            path: 'pending-application',
            element: <ManagerPendingApp></ManagerPendingApp>,
          },
          {
            path: 'manager-profile',
            element: <ManagerProfile></ManagerProfile>,
          },
        ],
      },
    ],
  },
]);
