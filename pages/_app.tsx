/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'axios';
import { useDispatch, wrapper } from 'store';
import type { AppContext, AppProps } from 'next/app';
import { getUser } from 'components/LoginPage/helpers';
import App from 'next/app';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { useEffect ,useState} from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import PageLoader from 'common/PageLoader';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.min.css';
import '../styles/globals.scss';


function MyApp({ Component, pageProps }: AppProps) {
  const [loading,setLoading]=useState(true)
  axios.defaults.baseURL = 'https://api.themoneystaging.com';
  const { pathname } = useRouter();
  const {userId,s_token}=pageProps
  const dispatch=useDispatch();

  const loadUser= async ()=>{
 
    axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`
    await getUser(userId)(dispatch)
    setLoading(false)
  }


  

  // useEffect(() => {
  //   console.log
  //   // some browsers (like safari) may require a timeout to delay calling this
  //   // function after a page has loaded; otherwise, it may not update the position
  //   window.scrollTo(0, 0);
  // }, [pathname]);



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
       <ToastContainer
      autoClose={5000}
      transition={Zoom}
      position="top-center"
      className="toast-container"
      toastClassName="dark-toast"
    />     
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


