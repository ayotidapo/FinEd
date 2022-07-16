import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';


interface IUSer{
	
		accessToken:string;
	    [key:string]:any
    
}

const initialState : IUSer = {
	accessToken:''
}


export const userSlice = createSlice({
	name:'user',

	initialState,

	reducers:{
		setUser(state,action){
			console.log({dat2:action.payload,state})
			
		     state.user= action.payload
		}
	},

	extraReducers:{
		[HYDRATE]:(state,_action)=>{
			console.log(state,'DAPO')
			return state
		}
	}
})


export const {setUser} = userSlice.actions
export default userSlice.reducer