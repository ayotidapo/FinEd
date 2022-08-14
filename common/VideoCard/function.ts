import axios from "axios"

export const bookMarkCourse =async(courseId:string)=> {

	try{
	   const {data} = await axios.post(`/bookmarks/${courseId}`)
 
	   return data
   
	   }catch(e:any){
		   return false
	   }
	   
   
   }


   export const unbookMarkCourse =async(courseId:string)=> {

	try{
	   const {data} = await axios.delete(`/bookmarks/${courseId}`)
 
	   return data
   
	   }catch(e:any){
		   return false
	   }
	   
   
   }
