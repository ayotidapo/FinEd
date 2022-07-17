import axios from 'axios';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

export const getContentUrl =async(id:string)=> {

 try{
	const {data} = await axios.get(`/content/${id}`)

	return data

	}catch(e:any){
		return false
	}
	

}