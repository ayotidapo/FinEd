import axios from "axios"

export const getCourseQuiz =async(courseId:string)=> {

	try{
	   const {data} = await axios.patch(`/quizes/course/{courseId}`)

	   return data   
	   }catch(e:any){
		   return false
	   }
	   
   
   }
