import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface ICourse {
    categories: string[];
    createdAt: string;
    description: string;
    level: string;
    paid: false;
    published: boolean;
    thumbnail: { id: string; url: string; key: string };
    title: string;
    updatedAt: string;
    [key: string]: any;
}

interface IState{
  courses:ICourse[]
}

const initialState:IState  = {
  courses:[]
}


export const courseSlice = createSlice({
	name:'courses',

	initialState,

	reducers:{
		setCourses(state: IState, action){
       
		    state.courses = {...action.payload}
		}
	},

	extraReducers:{
		[HYDRATE]:(state:IState,action)=>{
      
      // console.log(action.payload,789098)
      if(!action?.payload?.courses.courses) return state	            		
			state.courses=action?.payload.courses.courses
			
		}
	}
})


export const {setCourses} = courseSlice.actions
export default courseSlice.reducer
