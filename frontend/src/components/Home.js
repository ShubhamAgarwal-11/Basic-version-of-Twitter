import React, { useEffect } from 'react'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import { Outlet, useNavigate } from 'react-router-dom'
import useOtherUsers from '../hooks/useOtherUsers'
import { useSelector } from 'react-redux'
import useGetMyTweets from '../hooks/useGetMyTweets'

const Home = () => {
  const {user,allUsers} = useSelector(store=>store.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
      navigate('/login');
    }
  },[])
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id)

  return (
    <div className='flex justify-between w-[80%] mx-auto'>
        <LeftBar/>
        <Outlet/>
        <RightBar otherUsers={allUsers} />
    </div>
  )
}

export default Home