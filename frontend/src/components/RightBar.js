import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom';

const RightBar = ({otherUsers}) => {
  return (
    <div className='w-[30%] p-2'>
        <div className=' flex items-center bg-gray-200 rounded-full p-2 outline-none'>
            <CiSearch size='18px'/>
            <input type="text" className='px-2 bg-transparent  outline-none' placeholder='Search' />
        </div>
        <div className='p-4 bg-gray-200 rounded-2xl my-4'>
          <h1 className='font-bold text-lg'>Who to follow</h1>  
          {/*  */}
          {/* {console.log("first ",otherUsers)} */}
          {
            
            otherUsers?.map((user)=>{
              return(
                  <div key={user?._id} className='flex items-center justify-between my-3'>
                  <div className='flex'>
                    <div>
                      <Avatar src="https://assets.dragoart.com/images/921_501/how-to-draw-tom_5e4c743f372789.04997633_5098_3_4.jpg" size="50" round={true} />
                    </div>
                    <div className='ml-2'>
                      <h1 className='font-bold'>{user?.name}</h1>
                      <p className='text-sm'>{`@${user?.username}`}</p>
                    </div>
                  </div>
                  <div className>
                    <Link to={`/profile/${user?._id}`}>
                      <button className='px-5 py-1 bg-black text-white rounded-full'>Profile</button>
                    </Link>
                  </div>
                </div>
                // <p>Hello</p>
              )
            })
          }
          

          {/* second user in follow list (redundent code) */}
          {/* <div className='flex items-center justify-between my-3'>
            <div className='flex'>
              <div>
                <Avatar src="https://assets.dragoart.com/images/921_501/how-to-draw-tom_5e4c743f372789.04997633_5098_3_4.jpg" size="50" round={true} />
              </div>
              <div className='ml-2'>
                <h1 className='font-bold'>Gunnu Jindal</h1>
                <p className='text-sm'>@gunnujindal2903</p>
              </div>
            </div>
            <div className>
                <button className='px-5 py-1 bg-black text-white rounded-full'>Profile</button>
              </div>
          </div> */}

          {/* third user in follow list (redundent code) */}
          {/* <div className='flex items-center justify-between my-3'>
            <div className='flex'>
              <div>
                <Avatar src="https://assets.dragoart.com/images/921_501/how-to-draw-tom_5e4c743f372789.04997633_5098_3_4.jpg" size="50" round={true} />
              </div>
              <div className='ml-2'>
                <h1 className='font-bold'>Gunnu Jindal</h1>
                <p className='text-sm'>@gunnujindal2903</p>
              </div>
            </div>
            <div className>
                <button className='px-5 py-1 bg-black text-white rounded-full'>Profile</button>
              </div>
          </div> */}

        </div>
    </div>
  )
}

export default RightBar