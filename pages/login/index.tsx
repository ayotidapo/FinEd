import axios from 'helpers/axios';
import LoginPage from 'components/LoginPage';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';

const Login = () => {
  return <LoginPage />;
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const c_token = getCookie('c_token', { req, res });

  const { userId } = getToken(c_token as string);

  if (userId) {
    return {
      redirect: {
        destination: '/courses',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
