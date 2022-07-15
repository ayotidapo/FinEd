// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';


type Data = {}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if(req.method==='POST'){
    const {token,userId} = req.body
 
    setCookie('c_token', '', { 
      req, 
      res, 
      maxAge: -1,
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      path:'/'
   });


    return res.status(200).json({});
  }
}





