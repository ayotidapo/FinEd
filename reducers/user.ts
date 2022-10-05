import {  createSlice, current } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';



interface IUSer{
	user:{
		// accessToken?:string;
        
	    [key:string]:any

	}

}

const initialState : IUSer = {
	user:{
		
		accessToken:''
	}
}


export const userSlice = createSlice({
	name:'user',

	initialState,

	reducers:{
		setUser(state: IUSer, action){
			
		    state.user = {...action.payload}
			
		},
		updateUser(state: IUSer, action){
			
		    state.user = {...state.user, ...action.payload}
			
		}
	},

	extraReducers:{
		[HYDRATE]:(state,_action)=>{
		 return state
		}
	}
})


export const {setUser,updateUser} = userSlice.actions
export default userSlice.reducer
