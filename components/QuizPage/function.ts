import axios from "axios"

export const submitQuiz =async(quizId:string,body:any)=> {

	try{
	   const {data} = await axios.post(`/quizes/${quizId}/submit`,body)

	   return data   
	   }catch(e:any){
		   return false
	   }
	   
   
   }
