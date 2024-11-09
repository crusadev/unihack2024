import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter} from "react-router-dom"
import { RouterProvider } from 'react-router-dom';
import AuthPage from './pages/auth';
import LoginForm from './components/login-form';
import AuthProvider, { AuthContext } from './react-logic/context/authContext';
import RegisterForm from './components/register-form';
import MainScreen from './pages/main-screen';
import ProtectedRoutes from './components/protected-routes';
import ChatScreen from './pages/chat';
import CloudScreen from './pages/cloud';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/auth",
        element:<AuthPage />,
        children:[
          {
            path:"/auth/login",
            element:<LoginForm />
          },
          {
            path:"/auth/register",
            element:<RegisterForm />
          }
        ]
      },
      {
        path:"/",
        element:<ProtectedRoutes />,
        children:[
          {
            path:"/home",
            element:<MainScreen />,
            children:[
              {
                path:"/home/chat",
                element:<ChatScreen />
              },
              {
                path:"/home/cloud",
                element:<CloudScreen />
              }
            ]
          }
        ]
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
