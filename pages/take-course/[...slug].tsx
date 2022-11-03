import TakeCoursePage from 'components/TakeCourse';
import Footer from 'common/Footer';
import axios from 'helpers/axios';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { ICourse } from 'components/VideosListPage';

interface Props {
  course: ICourse;
  token: string;
}

const TakeCourse: React.FC<Props> = (props) => {
  const { course, token } = props;

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return (
    <>
      <TakeCoursePage course={course} />
      <Footer />
    </>
  );
};

export default TakeCourse;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const c_token = getCookie('c_token', { req, res });
  const { s_token, userId } = getToken(c_token as string);
  const paramz = params?.slug || [];

  const courseId = paramz[0];

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
    const { data } = await axios.get(`/courses-user/${courseId}`);
    console.log({ data });
    return {
      props: {
        course: data,
        token: s_token,
      },
    };
  } catch (e: any) {
    console.log(e.response, 'kdkdkdkd', e.message);

    return {
      props: {
        course: {},
        error: 'call failed',
      },
    };
  }
};
