import axios from 'helpers/axios';


export const getContentUrl =async(id:string)=> {

 try{
	const {data} = await axios.get(`/content/${id}`)

	return data

	}catch(e:any){
		console.log(e)
		return false
	}
	

}


export const sendContentProgress =async(contentId:string,timeWatched:number)=> {

	try{
		console.log({progress:timeWatched})
	   const {data} = await axios.patch(`/analytics/content/${contentId}`,{progress:timeWatched})

	   return data
   
	   }catch(e:any){
		console.log(e)
		   return false
	   }
	   
   
   }

   export const getLastWatchContent =async(contentId:string)=> {

	try{
	   const {data} = await axios.patch(`/analytics/content/latest/${contentId}`)

	   return data   
	   }catch(e:any){
		console.log(e)
		   if(e?.response.status === 404) return {error:404}
		   return false
	   }
	   
   
   }

