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