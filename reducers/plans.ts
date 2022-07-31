import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IAction } from 'store';


export interface IPlan {
	active: boolean;
	dateCreated: string;
	dateUpdated: string;
	duration: number;
	id: string;
	name: string;
	price: number;
}



const initialState:any[] = []

export const plansSlice = createSlice({
	name:'plans',

	initialState,

	reducers:{
		setActivePlans(state?: IPlan[], action?:IAction){

		  state = [...action?.payload]
		}
	},

	extraReducers:{
		[HYDRATE]:(state?: IPlan[], action?:IAction)=>{
			if(action?.payload?.plans.length === 0) return state
			
			state=[...action?.payload.plans]
		}
	}
})


export const { setActivePlans } = plansSlice.actions
export default plansSlice.reducer
