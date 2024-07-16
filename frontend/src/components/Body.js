import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Feed from './Feed'
import Profile  from './Profile'
import Favorite from './Favorite'
const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Home/>,
            children:[
                {
                    path: '/',
                    element : <Feed/>
                },
                {
                    path : "/profile/:id",
                    element : <Profile/>
                },
                {
                    path : "/favorite",
                    element : <Favorite/>
                }
            ]
        },
        {
            path: '/login',
            element: <Login/>
        }
    ])
  return (
    <RouterProvider router={appRouter}/>
  )
}

export default Body