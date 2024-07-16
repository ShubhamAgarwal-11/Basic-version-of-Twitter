import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar'
import { useDispatch, useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile';
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constent';
import toast from 'react-hot-toast';
import { refreshFeed } from '../redux/tweetSlice';
import { followingUpdate } from '../redux/userSlice';

const Profile = () => {
  const {profile,user} = useSelector(store=>store.user);
  const {id} = useParams();
  const dispatch = useDispatch();
  useGetProfile(id);

  const followUnfollowHandler = async()=>{
    if(user.following.includes(id)){
      // unfollow
      try {
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,{id : user?._id},{
          withCredentials : true
        })
        dispatch(followingUpdate(id));
        dispatch(refreshFeed());
        if(res.data.success){
          toast.success(res.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
      }
    }else{
      // follow
      try {
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`,{id : user?._id},{
          withCredentials : true
        })
        dispatch(followingUpdate(id));
        dispatch(refreshFeed());
        if(res.data.success){
          toast.success(res.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
      }

    }
  } 
  return (
    <div className='w-[50%] border-l border-r border-gray-300'>
        <div>
            <div className='flex items-center py-2'>
              <Link to='/' className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <IoMdArrowBack size='20px'/>
              </Link>
              <div className='ml-3'>
                <h1 className='font-bold text-lg'>{profile?.name}</h1>
                <p className='text-gray-500 text-sm'>@{profile?.username}</p>
              </div>
                
            </div>
            <img src='https://images.unsplash.com/photo-1504805572947-34fad45aed93?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D' className='w-full h-52' alt='cover-image'/>
            <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
              <Avatar src="https://assets.dragoart.com/images/921_501/how-to-draw-tom_5e4c743f372789.04997633_5098_3_4.jpg" size="120" round={true} />
            </div>
            <div className='text-right m-4'>
              {
                  profile?._id === user?._id ? (
                    <button className='px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-300 font-bold'>Edit Profile</button>

                  ) : (
                    <button onClick={followUnfollowHandler} className='px-4 py-1 rounded-full bg-black text-white font-bold'>{user.following.includes(id) ? "Following" : "Follow"}</button>
                  )
              }
            </div>
            <div className='m-4'>
              <h1 className='text-xl font-bold'>{profile?.name}</h1>
              <p>@{profile?.username}</p>
            </div>
            {/* this div is for BIO */}
            <div className='text-sm m-4'>
              <p>Passionate traveler 🌍 | Foodie 🍣 | Yoga enthusiast 🧘‍♀️ | Cat lover 🐾 | Sharing moments of joy and inspiration ✨ #Wanderlust #HealthyLiving</p>
            </div>
        </div>
    </div>
  )
}

export default Profile