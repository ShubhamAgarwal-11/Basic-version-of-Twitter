import React, { useState } from 'react'
import axios from 'axios'
import {USER_API_END_POINT} from '../utils/constent'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { getUser } from '../redux/userSlice'
const Login = () => {
  const [isLogin , setIsLogin] = useState(true);
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [username , setUsername] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async(e)=>{
    e.preventDefault();
    // console.log(email,name,password,username)
    if(isLogin){
      // login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`,{email , password},{
          headers : {
            "Content-Type" : "application/json"
          },
          withCredentials: true
        });
        dispatch(getUser(res?.data?.user))
        if(res.data.success){
          toast.success(res.data.message)
          Navigate('/')
        }
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
      }
    }else{
      // register
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`,{name,username,email,password},{
          headers:{
            'Content-Type' : "application/json"
          },
          withCredentials : true
        })
        if(res.data.success){
          toast.success(res.data.message)
          setIsLogin(true)
        }
      } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
      }
    }
  }
  const LoginSignupHandler = ()=>{
    setIsLogin(!isLogin);
  }
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img className=' ml-5' width={"500px"} src='https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1719878400&semt=ais_user' alt='twitter-logo'/>
        </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-6xl'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin? "Login" : "Create Account"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[55%]'>
          {
            !isLogin && <>
              <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Name' className='outline-blue-500 border border-gray-800 rounded-full px-3 py-1 my-1'/>
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='UserName' className='outline-blue-500 border border-gray-800 rounded-full px-3 py-1 my-1'/>
            </>
          }
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' className='outline-blue-500 border border-gray-800 rounded-full px-3 py-1 my-1'/>
          <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='outline-blue-500 border border-gray-800 rounded-full px-3 py-1 my-1'/>
          <button className='bg-[#1D9BF0] border-none py-2 my-4 text-white text-lg rounded-full '>{isLogin? "Login" : "Create Account"}</button>
          <h1>{isLogin ? "Do not have an account?" :"Already have an account?"} <span className='cursor-pointer text-blue-600 font-bold' onClick={LoginSignupHandler}>{isLogin ? "Register" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login