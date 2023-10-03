import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './layout/Root/Root.jsx';
import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import AuthProvider from './components/Providers/AuthProvider';
import Orders from './components/Orders/Orders';
import PrivateRoutes from './components/Routes/PrivateRoutes/PrivateRoutes';
import Profile from './components/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/profile',
        element: <PrivateRoutes> <Profile></Profile> </PrivateRoutes>
      },
      {
        path: '/orders',
        element: <PrivateRoutes> <Orders></Orders> </PrivateRoutes>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
