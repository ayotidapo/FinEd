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

interface IState{
    plans:IPlan[]
}


const initialState:IState= {
	plans:[]
}

export const plansSlice = createSlice({
	name:'plans',

	initialState,

	reducers:{
		setPlans(state: IState, action: PayloadAction<IAction>){
			// console.log('hhhh',action)

		  state.plans = [...action.payload.plans]
		}
	},

	extraReducers:{
		[HYDRATE]:(state:IState, action)=>{
			// console.log(action?.payload.plans)
			if(action?.payload?.plans.length === 0) return state
			
			state.plans=[...action?.payload.plans.plans]
		}
	}
})


export const { setPlans } = plansSlice.actions
export default plansSlice.reducer
