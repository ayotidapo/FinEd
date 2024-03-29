import axios from 'helpers/axios';
import ChoosePlanPage from 'components/ChoosePlan';
import { IPlan } from 'components/SubscriptionPage';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { wrapper } from 'store';

interface Props {
  plans: IPlan[];
  token: string;
}

const ChoosePlan: React.FC<Props> = ({ plans, token }) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return <ChoosePlanPage plans={plans} />;
};

export default ChoosePlan;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`;
      const { data } = await axios.get('/plans/noauth');

      return {
        props: {
          plans: data,
          token: s_token,
        },
      };
    } catch (e) {
      return {
        props: {
          error: 'call failed',
        },
      };
    }
  });
