import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Calculator.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TaskManger from './TaskManger.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:<App></App>,
  },{
    path:"/task",
    element:<TaskManger></TaskManger>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
