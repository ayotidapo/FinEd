import { createSlice,current } from '@reduxjs/toolkit';
import { IContent } from 'components/VideoDetails';
import { HYDRATE } from 'next-redux-wrapper';

export interface ICourse {
    categories: string[];
    createdAt: string;
    description: string;
    contents?:IContent[];
    level: string;
    paid: false;
    published: boolean;
    thumbnail: { id: string; url: string; key: string };
    title: string;
    updatedAt: string;
    [key: string]: any;
}

interface IState{
  courses:any
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
		},
    updateCourses(state: IState, action){
      console.log(current(state),state.courses)
      const { courses } = state.courses;
       const courseIndex=courses?.findIndex((course:any) => course.id === action.payload?.courseId)
       courses[courseIndex].bookmark=action.payload?.bookmark
      
    }
	},

	extraReducers:{
		[HYDRATE]:(state:IState,action)=>{
      
      //console.log(action.payload.courses.courses,789098)
      if(action?.payload?.courses.courses?.length) return state	            		
			state.courses=action.payload.courses.courses
			
		}
	}
})


export const {setCourses,updateCourses} = courseSlice.actions
export default courseSlice.reducer
