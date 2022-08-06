import VideoDetailsPage from 'components/VideoDetails';
import Footer from 'common/Footer';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { ICourse } from 'components/VideosListPage';
import { IPlan } from 'components/SubscriptionPage';

const VideoDetails: React.FC<{ course: ICourse; plans: IPlan[] }> = ({
  course,
  plans,
}) => {
  return (
    <>
      <VideoDetailsPage course={course} plans={plans} />
      <Footer />
    </>
  );
};

export default VideoDetails;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const c_token = getCookie('c_token', { req, res });
  const { s_token, userId } = getToken(c_token as string);
  const paramz = params?.slug || [];

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
    const { data } = await axios.get(`/courses-user/${paramz[0]}`);

    const { data: plans } = await axios.get('/plans/noauth');
    console.log(plans, 1899);
    return {
      props: {
        course: data,
        plans,
      },
    };
  } catch (e: any) {
    return {
      props: {
        error: 'call failed',
      },
    };
  }
};
