/* eslint-disable react-hooks/exhaustive-deps */

import '../styles/globals.scss';
import axios from 'axios';
import { useDispatch, wrapper } from 'store';
import type { AppContext, AppProps } from 'next/app';
import { getUser } from 'components/LoginPage/functions';
import App from 'next/app';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { useEffect ,useState} from 'react';
import PageLoader from 'common/PageLoader';


function MyApp({ Component, pageProps }: AppProps) {
  const [loading,setLoading]=useState(true)
  axios.defaults.baseURL = 'https://api.themoneystaging.com';
 
  const {userId,s_token}=pageProps
  const dispatch=useDispatch();

  const loadUser= async ()=>{
 
    axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`
    await getUser(userId)(dispatch)
    setLoading(false)
  }

  useEffect(()=>{   
    loadUser()   
  },[userId,s_token])

  if(loading) {
    return (
      <div className="container">
        <PageLoader/>
       </div>
      )
    }
  
  return (
    <div className="container">
      
      <Component {...pageProps} />
    </div>
  );
}



MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
    const { req, res } = appContext.ctx
  const c_token = getCookie('c_token', { req, res })
  const { s_token ,userId } = getToken(c_token as string)

  return {
    pageProps: {
      ...appProps.pageProps,
      userId:  userId,
      s_token,
    },
  }
}


export default wrapper.withRedux(MyApp);



// function MyApp({ Component, pageProps }: AppProps) {

//   return <Component {...pageProps} />
// }


// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);

//   const { req, res } = appContext.ctx
//   const c_token = getCookie('c_token', { req, res })
//   const { userId } = getToken(c_token as string)

  

//   return { ...appProps, userId: `lo${userId}` };
// };




// function MyApp({ Component, pageProps }: AppProps) {
//   const { user } = useSelector(state => state?.user?.user)
//   useEffect(() => {
//     getUser()
//   })
//   return (
//     <div className="container">
//       <Component {...pageProps} />
//     </div>
//   );
// }


