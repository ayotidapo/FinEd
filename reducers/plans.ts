import { createSlice } from '@reduxjs/toolkit';
import { IPlan } from 'common/SubscriptionCard';
import { HYDRATE } from 'next-redux-wrapper';
import { IAction } from 'store';



const initialState:any[] = []

export const plansSlice = createSlice({
	name:'plans',

	initialState,

	reducers:{
		setActivePlans(state?: IPlan[], action?:IAction){
			console.log(action?.payload,'6775')
		  state = [...action?.payload]
		}
	},

	extraReducers:{
		[HYDRATE]:(state?: IPlan[], action?:IAction)=>{
			if(action?.payload?.plans.length === 0) return state
			console.log(action?.payload.plans,6760)
			state=[...action?.payload.plans]
		}
	}
})


export const { setActivePlans } = plansSlice.actions
export default plansSlice.reducer
