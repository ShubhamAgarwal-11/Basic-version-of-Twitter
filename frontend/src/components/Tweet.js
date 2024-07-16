import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

import toast from "react-hot-toast"
import axios from 'axios'
import {TWEET_API_END_POINT, USER_API_END_POINT} from "../utils/constent"
import {useDispatch, useSelector} from 'react-redux'
import {refreshFeed} from '../redux/tweetSlice'
import { BsThreeDots } from "react-icons/bs";
import DeleteTweetpopUp from './deleteTweetbutton'

const Tweet = ({tweet}) => {
    const {user} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    const [showDeleteBtn , setShowDeleteBtn] = useState(false);
    let flag = false;
    const LikeOrDislikeHandler = async(id)=>{
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id : user?._id},{
                withCredentials : true
            })
            dispatch(refreshFeed());
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const deleteTweetHandler = async(id)=>{
        console.log("hello",id)
        try {
            console.log(id);
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{
                withCredentials : true
            })
            dispatch(refreshFeed());
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const bookmarkHandler = async(id)=>{
        try {
            const res = await axios.put(`${USER_API_END_POINT}/bookmark/${id}`,{id : user?._id},{
                withCredentials : true
            })
            flag = !flag;
            dispatch(refreshFeed());
            if(res.data.success){
                toast.success(res.data.message);
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

  return (
    <div className='border-b border-gray-200'>
        <div>
            <div className='flex items-center p-3'>
                <Avatar src="https://assets.dragoart.com/images/921_501/how-to-draw-tom_5e4c743f372789.04997633_5098_3_4.jpg" size="55" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1>{tweet?.userDetails[0]?.name}</h1>
                        <p className='text-sm text-gray-500 ml-2'>{`@${tweet?.userDetails[0]?.username}`} . 5m</p>
                        <div className='ml-auto items-center hover:bg-gray-300 p-1 rounded-full'>
                            <div onClick={()=>setShowDeleteBtn(true)} >
                                <BsThreeDots/>
                            </div>
                            {
                                tweet?.userId === user?._id && showDeleteBtn && <DeleteTweetpopUp deleteTweet={()=>deleteTweetHandler(tweet?._id)} onClose={()=>setShowDeleteBtn(false)}/>
                            }
                        </div>
                    </div>
                    <div>
                        <p>{tweet?.description}</p>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='hover:bg-green-300 rounded-full p-2 cursor-pointer'>
                                <FaRegComment size="18px"/>
                            </div>
                            <p className='ml-1'>0</p>
                        </div>
                        <div className='flex items-center'>
                            <div onClick={()=>LikeOrDislikeHandler(tweet?._id)} className='hover:bg-pink-400 rounded-full p-2 cursor-pointer'>
                                <FaRegHeart size="18px"/>
                            </div>
                            <p className='ml-1'>{tweet?.like?.length}</p>
                        </div>

                        <div className='flex items-center'>
                            <div onClick={()=>bookmarkHandler(tweet?._id)} className='hover:bg-yellow-400 cursor-pointer p-2 rounded-full'>
                                <FaRegBookmark size="18px"/>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweet