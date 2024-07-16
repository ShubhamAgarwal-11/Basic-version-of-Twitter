import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "../utils/constent";
import axios from 'axios'
import { getOtherUsers } from "../redux/userSlice";
import { useEffect } from "react";
const useOtherUsers = (id)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                const res = await axios.get(`${USER_API_END_POINT}/allusers/${id}`,{
                    withCredentials : true
                })
                // console.log(res.data.users);
                dispatch(getOtherUsers(res.data.users))
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    },[])
}
export default useOtherUsers;