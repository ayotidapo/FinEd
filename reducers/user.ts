import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IAction } from 'store';


interface IUSer{
	user:{
		accessToken?:string;

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
		setUser(state: IUSer, action: PayloadAction<IAction>){
   console.log(action.payload)
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
