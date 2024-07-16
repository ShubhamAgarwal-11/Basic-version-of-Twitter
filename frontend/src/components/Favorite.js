import React, {useState} from 'react'
import Tweet from './Tweet'
import { useDispatch, useSelector } from 'react-redux'
import { getIsActive } from '../redux/tweetSlice'
import axios from 'axios'
import { TWEET_API_END_POINT } from '../utils/constent'
import { refreshFeed } from '../redux/tweetSlice'
import toast from 'react-hot-toast'
import Avatar from 'react-avatar'
import { CiImageOn } from "react-icons/ci";

const Favorite = () => {
    const dispatch = useDispatch();
    dispatch(getIsActive("favorite"));
    const {tweets} = useSelector(store=>store.tweet);
    const [description , setDescription] = useState("");
    const {user} = useSelector(store=>store.user);
    const {isActive} = useSelector(store=>store.tweet)
    const submitHandler = async()=>{
        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`,{description , id:user?._id},{
                withCredentials : true
            })
            dispatch(refreshFeed());
            if(res.data.success){
                toast.success(res.data.message);
            }        
        } catch (error) {
            toast.error(error.response.data.message)
        }
        setDescription("");
    }

  return (
    <div className='w-[50%]  border-l border-r border-gray-300'>

    <div className='w-[100%]'>
        <div>
            <div className='flex items-center justify-evenly border-b border-gray-200'>
                <div className={` ${isActive === "favorite"? "border-b-4 border-blue-600":""} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                    <h1 className='font-semibold text-gray-600 text-lg'>Favorite</h1>
                </div>
            </div>
            <div>
                <div className='flex items-center p-4'>
                    <div>
                        <Avatar src="https://assets.dragoart.com/images/921_501/how-to-draw-tom_5e4c743f372789.04997633_5098_3_4.jpg" size="55" round={true} />
                    </div>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className='outline-none border-none w-full text-xl ml-2' type='text' placeholder='What is happening?!'></input>
                </div>
                <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                    <div>
                        <CiImageOn size='24px'/>
                    </div>
                    <button onClick={submitHandler} className='bg-[#1D9BF0] text-white rounded-full border-none px-4 py-1 text-lg'>Post</button>
                </div>
            </div>
        </div>
    </div>

      {
        tweets?.map((tweet)=> <Tweet key={tweet?._id} tweet={tweet}/>)
      }
    </div>
  )
}

export default Favorite