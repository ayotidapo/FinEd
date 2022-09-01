
import axios from 'axios';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken'

export const getToken= (c_token:string):jwt.JwtPayload =>{
	try{
		const decoded =jwt.verify(c_token,<string>process.env.JWT_SECRET) as {username:string,s_token:string};
		axios.defaults.headers.common['Authorization'] = `Bearer ${decoded.s_token}`;
		return {...decoded}
	}catch(e){

		return {userId:'',s_token:''}
	}	
	
}

