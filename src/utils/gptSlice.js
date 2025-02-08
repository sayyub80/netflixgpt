import {createSlice} from "@reduxjs/toolkit"

const gptSlice=createSlice({
    name:"gpt",
    initialState:{
       showGptSearch:false,
       gptSearchMovieResults:null,
       tmdSearchbMovieResults:null
    },
    
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showGptSearch=!state.showGptSearch
        },
        addGptSearchMovieResult:(state,action)=>{
            const {gptSearchMovieResults,tmdSearchbMovieResults}=action.payload
            state.gptSearchMovieResults=gptSearchMovieResults
            state.tmdSearchbMovieResults=tmdSearchbMovieResults
        }
       
    }
})

export const {toggleGptSearchView,addGptSearchMovieResult} = gptSlice.actions
export default gptSlice.reducer;