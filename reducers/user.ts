import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';


interface IUSer{
	user:{
		accessToken:string;

	    [key:string]:any
    
	}
		
}

const initialState : IUSer = {
	user:{accessToken:''}
}


export const userSlice = createSlice({
	name:'user',

	initialState,

	reducers:{
		setUser(state,action){
			
		     state.user = {...action.payload}

		}
	},

	extraReducers:{
		[HYDRATE]:(state,_action)=>{
		
			return state
		}
	}
})


export const {setUser} = userSlice.actions
export default userSlice.reducer