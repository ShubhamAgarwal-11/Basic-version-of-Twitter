import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
        allUsers :  null,
        profile : null
    },
    reducers : {
        // multiple actions
        getUser : (state,action)=>{
            state.user = action.payload;
        },
        getOtherUsers : (state,action)=>{
            state.allUsers = action.payload;
        },
        getMyProfile : (state,action)=>{
            state.profile = action.payload;
        },
        followingUpdate : (state,action)=>{
            if(state.user.following.includes(action.payload)){
                // here unfollowUser update
                state.user.following = state.user.following.filter((userId)=>{
                    return userId !== action.payload
                })
            }else{
                // here followUser update
                state.user.following.push(action.payload)
            }
        }
    }
})

export const {getOtherUsers,getUser,getMyProfile,followingUpdate} = userSlice.actions;
export default userSlice.reducer