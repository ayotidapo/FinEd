
import jwt from 'jsonwebtoken'

export const getToken= (c_token:string):jwt.JwtPayload =>{
	try{
		const decoded =jwt.verify(c_token,<string>process.env.JWT_SECRET) as {username:string,s_token:string};

		return {...decoded}
	}catch(e){

		return {username:'',s_token:''}
	}	
	
}