import axios from 'helpers/axios';
import SettingsPage from 'components/Settings';
import { IPlan } from 'components/SubscriptionPage';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { setUser } from 'reducers/user';
import { wrapper } from 'store';

interface Props {
  plans: IPlan[];
  s_token: string;
}

const Settings: React.FC<Props> = (props) => {
  const { plans, s_token } = props;
  axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`;
  return (
    <>
      <SettingsPage plans={plans} />
    </>
  );
};

export default Settings;

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
      const { data: user } = await axios.get(`/auth/profile`);

      store.dispatch(setUser({ user }));
      return {
        props: {
          plans: data,
          s_token,
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
