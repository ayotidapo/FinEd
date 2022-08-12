import TakeCoursePage from 'components/TakeCourse';
import Footer from 'common/Footer';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { ICourse } from 'components/VideosListPage';

interface Props {
  course: ICourse;
  latestCourseContent: ICourse;
}

const TakeCourse: React.FC<Props> = (props) => {
  const { course, latestCourseContent } = props;
  return (
    <>
      <TakeCoursePage
        course={course}
        latestCourseContent={latestCourseContent}
      />
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
    const { data: latestCourseContent } = await axios.get(
      `/analytics/content/latest/${courseId}`,
    );

    return {
      props: {
        course: data,
        latestCourseContent,
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
