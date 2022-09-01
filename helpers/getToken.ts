

import jwt from 'jsonwebtoken'

export const getToken= (c_token:string):jwt.JwtPayload =>{
	try{
		console.log(process.env.JWT_SECRET,process.env.FLUTTERWAVE_KEY)
		const decoded =jwt.verify(c_token,<string>process.env.JWT_SECRET) as {username:string,s_token:string};
		return {...decoded}
	}catch(e){

		return {userId:'',s_token:''}
	}	
	
}


