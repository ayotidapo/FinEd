import VideoDetailsPage from 'components/VideoDetails';
import Footer from 'common/Footer';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { ICourse } from 'components/VideosListPage';
import { IPlan } from 'components/SubscriptionPage';

interface Props {
  course: ICourse;
  plans: IPlan[];
  reviews: {
    [key: string]: any;
  };
}

const VideoDetails: React.FC<Props> = ({ course, plans, reviews }) => {
  return (
    <>
      <VideoDetailsPage course={course} plans={plans} reviews={reviews} />
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
    const { data: reviews } = await axios.get(`/ratings/${paramz[0]}`);
    return {
      props: {
        course: data,
        plans,
        reviews,
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
