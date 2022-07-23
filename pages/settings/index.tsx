import axios from 'axios';
import SettingsPage from 'components/Settings';
import { getActivePlans } from 'components/SubscriptionPage/functions'
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { setActivePlans } from 'reducers/plans';
import { wrapper } from 'store';

const Settings = () => {
  return (
    <>
      <SettingsPage />
    </>
  )
};

export default Settings;




export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({ req, res }) => {
  const c_token = getCookie('c_token', { req, res })
  const { s_token, userId } = getToken(c_token as string)

  if (!userId) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`
    const data = await axios.get('/plans');
    console.log(data, 1238)
    store.dispatch(setActivePlans(data))
    console.log(data, 1239)
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    console.log('data')
    return {
      props: {
        error: "call failed",
      },
    }

  }
})