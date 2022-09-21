import axios from 'axios';
import VerifyPaymentPage from 'components/VerifyPayment';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';

const VerifyPayment: React.FC<{ token: string }> = ({
  token,
}: {
  token: string;
}) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return <VerifyPaymentPage />;
};

export default VerifyPayment;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const c_token = getCookie('c_token', { req, res });
  const { s_token, userId } = getToken(c_token as string);

  if (!userId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  try {
    return {
      props: {
        token: s_token,
      },
    };
  } catch (e: any) {
    return {
      props: {
        course: {},
        error: 'call failed',
      },
    };
  }
};
