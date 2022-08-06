import axios from 'axios';
import MyLearningPage from 'components/MyLearningPage';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { wrapper } from 'store';

interface Props {}

const Settings: React.FC<Props> = (props) => {
  return (
    <>
      <MyLearningPage />
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

      return {
        props: {
          plans: data,
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