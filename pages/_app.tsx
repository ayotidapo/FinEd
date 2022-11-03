/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'helpers/axios';
import { useDispatch, wrapper } from 'store';
import type { AppContext, AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { useEffect, useCallback } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { setUser } from 'reducers/user';
import Header from 'common/HeaderLoggedIn';
import App from 'next/app';
import 'react-toastify/dist/ReactToastify.min.css';
import 'nprogress/nprogress.css'; //styles of nprogress
import '../styles/globals.scss';
import { getPlans } from 'components/LoginPage/helpers';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

const c_token = getCookie('c_token');
const { s_token } = getToken(c_token as string);
axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  axios.defaults.baseURL = 'https://api.themoneystaging.com';
  const { userId, s_token, user } = pageProps;
  const dispatch = useDispatch();
  const path = router.pathname;

  const isHideHeader =
    path.includes('take-course') || path.includes('choose-plan');

  useEffect(() => {
    dispatch(setUser(user));
    dispatch(getPlans());
  }, [userId, s_token]);

  return (
    <div className="container">
      {userId}
      <ToastContainer
        autoClose={5000}
        transition={Zoom}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
      />

      {userId && !isHideHeader && (
        <Header style={{ backgroundImage: 'url("/assets/vidheaderbg.png")' }} />
      )}
      <Component {...pageProps} />
    </div>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req, res } = appContext.ctx;
  const c_token = getCookie('c_token', { req, res });
  console.log('DAP');
  let user = {};
  const { s_token, userId } = getToken(c_token as string);
  if (c_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`;
    const { data } = await axios.get(
      `https://api.themoneystaging.com/auth/profile`,
    );
    user = data;
  }

  return {
    pageProps: {
      ...appProps.pageProps,
      userId: userId,
      s_token,
      user,
    },
  };
};

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
