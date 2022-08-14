import axios from 'axios';


export const getContentUrl =async(id:string)=> {

 try{
	const {data} = await axios.get(`/content/${id}`)

	return data

	}catch(e:any){
		return false
	}
	

}


export const sendContentProgress =async(contentId:string,timeWatched:number)=> {

	try{
	   const {data} = await axios.patch(`/analytics/content/${contentId}`,{progress:timeWatched})
       console.log(data)
	   return data
   
	   }catch(e:any){
		   return false
	   }
	   
   
   }

   export const getLastWatchContent =async(contentId:string)=> {

	try{
	   const {data} = await axios.patch(`/analytics/content/latest/${contentId}`)
       console.log(data)
	   return data   
	   }catch(e:any){
		   if(e?.response.status === 404) return {error:404}
		   return false
	   }
	   
   
   }

