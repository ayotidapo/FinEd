import axios from 'axios';
import LoginPage from 'components/LoginPage';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';

const Login = () => {
  return <LoginPage />;
};

export default Login;


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const c_token = getCookie('c_token', { req, res })

  const { s_token, username } = getToken(c_token as string)
  console.log({ c_token, s_token, username });
  axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`

  if (username) {
    return {
      redirect: {
        destination: '/contents/videos',
        permanent: false
      },

    }
  }
  return {
    props: {

    }
  }
}