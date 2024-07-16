import axios from "axios"
import { TWEET_API_END_POINT } from "../utils/constent"
import {useDispatch, useSelector} from 'react-redux'
import { getAllTweets } from "../redux/tweetSlice";
import { useEffect } from "react";
const useGetMyTweets = (id)=>{
    const dispatch = useDispatch();
    const {refresh,isActive} = useSelector(store=>store.tweet)

    const followingTweetsHandler = async()=>{
      try {
          axios.defaults.withCredentials = true;
          const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`)
          console.log(res.data.Tweets);
          dispatch(getAllTweets(res?.data?.Tweets));
      } catch (error) {
          console.log(error);
      }
  }

  const bookmarkTweetHandler = async()=>{
    try {
      const res = await axios.post(`${TWEET_API_END_POINT}/favorite`,{id},{
        withCredentials : true
      })
      dispatch(getAllTweets(res?.data?.Tweets));
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllTweets = async()=>{
    try {
        const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`,{
            withCredentials : true
        })
        console.log(res.data.tweets)
        dispatch(getAllTweets(res.data.tweets))
      } catch (error) {
        console.log(error);
      }
  }
    useEffect(() => {
      if(isActive === "foryou"){
        fetchAllTweets();
      }else if(isActive === "following"){
        followingTweetsHandler();
      }else{
        bookmarkTweetHandler();
      }
    }, [refresh,isActive])
}

export default useGetMyTweets;