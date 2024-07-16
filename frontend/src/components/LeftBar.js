import React from 'react'
import { FaHome } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../utils/constent';
import toast from 'react-hot-toast'
import axios from 'axios'
import { getOtherUsers, getUser,getMyProfile } from '../redux/userSlice';
import { getAllTweets } from '../redux/tweetSlice';
// import { refreshFeed } from '../redux/tweetSlice';


const LeftBar = () => {
    const {user} = useSelector(store=>store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async()=>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{
                withCredentials : true
            })
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
            dispatch(getAllTweets(null))
            navigate('/login')
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <div className='w-[20%]'>
            <div>
                <img className='w-12 ml-3' src='https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719878400&semt=ais_user' alt='twitter-logo'/>
            </div>
             
            <div className='my-4'>
                <Link to='/' className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div>
                        <FaHome size="24px" />
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Home</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div>
                        <IoSearch size="24px" />
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Explore</h1>
                </div>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div>
                        <MdNotificationsNone size="24px" />
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Notification</h1>
                </div>
                <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div>
                        <FaRegUser size="20px" />
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Profile</h1>
                </Link>
                <Link to='/favorite' className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div>
                        <MdFavoriteBorder size="24px" />
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Favorite</h1>
                </Link>
                <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div>
                        <IoMdLogOut size="20px" />
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Logout</h1>
                </div>
                <button className='px-3 py-2 w-full bg-[#1D9BF0] text-white rounded-full text-md border-none font-bold'>Post</button>
            </div>
        </div>
    </>
  )
}

export default LeftBar