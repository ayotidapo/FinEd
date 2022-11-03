import axios from 'helpers/axios';
import SignUpPage from 'components/SignupPage';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';

const SignUp = () => {
  return <SignUpPage />;
};
export default SignUp;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const c_token = getCookie('c_token', { req, res });

  const { s_token, userId } = getToken(c_token as string);

  axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`;

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
