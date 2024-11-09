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
import Profile from './pages/profile';
import ConvProvider from './react-logic/context/conversationContext';
import ChatsList from './pages/chat-list';
import MessagesProvider from './react-logic/context/messagesContext';

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
                path:"/home/chatlist",
                element:<ChatsList />
              },
              {
                path:"/home/chat/:conversation_id",
                element:<ChatScreen />
              },
              {
                path:"/home/cloud",
                element:<CloudScreen />
              },
              {
                path:"/home/profile",
                element:<Profile />
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
      <ConvProvider>
        <MessagesProvider>
          <RouterProvider router={router} />
        </MessagesProvider>
      </ConvProvider>
    </AuthProvider>
  </React.StrictMode>
);
