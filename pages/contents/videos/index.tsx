import VideoPage, { ICourse } from 'components/VideosListPage';
import { getToken } from 'helpers/getToken'
import axios from 'axios'
import Footer from 'common/Footer';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';

interface Props {
  data: {
    courses: ICourse[]
    [key: string]: any,
  }
  gh: string
}


const Videos: React.FC<Props> = (props) => {
  const { data } = props
  console.log({ data })
  return (
    <>
      <VideoPage data={data} />
      <Footer />
    </>
  );
};

export default Videos;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const c_token = getCookie('c_token', { req, res })
  const { s_token, username } = getToken(c_token as string)

  if (!username) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`
    const { data } = await axios.get('/courses-user/noauth?skip=0&take=20')
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    return {
      props: {
        error: "call failed",
      },
    }

  }
}