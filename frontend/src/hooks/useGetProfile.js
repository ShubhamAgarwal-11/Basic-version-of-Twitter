import axios from 'axios'
import {USER_API_END_POINT} from '../utils/constent.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMyProfile } from '../redux/userSlice.js'

const useGetProfile = async(id)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchProfile = async()=>{
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    withCredentials : true
                })
                dispatch(getMyProfile(res?.data?.user));
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile()
    },[id])
}

export default useGetProfile;