import { createSlice } from '@reduxjs/toolkit';
import { IPlan } from 'common/SubscriptionCard';
import { HYDRATE } from 'next-redux-wrapper';
import { IAction } from 'store';



const initialState:IPlan[] = [{
	active: false,
	dateCreated: '',
	dateUpdated: '',
	duration: 0,
	id: '',
	name: '',
	price: 0
}]

export const plansSlice = createSlice({
	name:'plans',

	initialState,

	reducers:{
		setActivePlans(state: IPlan[], action:IAction){
		  state = [...action.payload]
		}
	},

	extraReducers:{
		[HYDRATE]:(state,action)=>{
			console.log(action.payload,676)
			return state
		}
	}
})


export const { setActivePlans } = plansSlice.actions
export default plansSlice.reducer
