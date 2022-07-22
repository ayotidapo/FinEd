import { createSlice } from '@reduxjs/toolkit';
import { IPlan } from 'common/SubscriptionArticles';
import { HYDRATE } from 'next-redux-wrapper';

const initialState : IPlan = {
  active: false,
  dateCreated: '',
  dateUpdated: '',
  duration: 0,
  id: '',
  name: '',
  price: 0
}

export const planSlice = createSlice({
	name:'plans',
	initialState,
	reducers:{
		setActivePlans(state: IPlan, action: any){
		  state = {...action.payload}
		}
	},

	extraReducers:{
		[HYDRATE]:(state,_action)=>{
			return state
		}
	}
})


export const { setActivePlans } = planSlice.actions
export default planSlice.reducer
