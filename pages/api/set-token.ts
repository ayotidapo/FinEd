// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken'
import { setCookie,CookieValueTypes } from 'cookies-next';


type Data = {
  c_token:CookieValueTypes;
  s_token:CookieValueTypes;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if(req.method==='POST'){
    const {token,userId} = req.body
    var c_token = jwt.sign({
      userId,
      s_token:token
    },<string>process.env.JWT_SECRET)
    setCookie('c_token', c_token, { 
      req, 
      res, 
      maxAge: 60 * 60 * 24,
       httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      path:'/'
   });


    return res.status(200).json({ c_token, s_token:token});
  }
}





