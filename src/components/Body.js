import React from 'react'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Error from './Error';
import Header from './Header';
import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee';
import EditEmployeeList from './EditEmployeeList';
import axios from 'axios';
const api = axios.create({
  baseURL: `/`
})

const AppLayout = () =>{
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Login />,
  },
  {
    path:"/",
    element:<AppLayout />,
    children:[
      {
        path:"/home",
        element:<Home />,
      },{
        path:"/emloyeelist",
        element:<EmployeeList api={api} />
      },{
        path:"/createemployee",
        element:<CreateEmployee api={api}/>
      },{
        path:"/editemployee/:id",
        element:<EditEmployeeList api={api} />
      }
    ],
    errorElement:<Error />
  }
])
const Body = () => {
  return (
    <RouterProvider router={appRouter} />
  )
}

export default Body