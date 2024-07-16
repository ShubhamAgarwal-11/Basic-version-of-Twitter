import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name : "tweet",
    initialState : {
        tweets : null,
        refresh : false,
        isActive : null
    },
    reducers : {
        getAllTweets : (state,action)=>{
            state.tweets = action.payload;
        },
        refreshFeed : (state)=>{
            state.refresh = !state.refresh;
        },
        getIsActive : (state,action)=>{
            state.isActive = action.payload;
        }
    }
})

export const {getAllTweets,refreshFeed,getIsActive} = tweetSlice.actions;
export default tweetSlice.reducer;