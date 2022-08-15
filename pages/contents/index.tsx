import VideoPage, { ICourse } from 'components/VideosListPage';
import { getToken } from 'helpers/getToken';
import axios from 'axios';
import Footer from 'common/Footer';
import { useSelector, wrapper } from 'store';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import { setCourses } from 'reducers/courses';

interface Props {
  courses: ICourse[];
  [key: string]: any;
}

const Videos: React.FC<Props> = () => {
  const courses: any = useSelector((state) => state.courses.courses);
  console.log(courses, 'poiui');
  return (
    <>
      <VideoPage
        courses={courses?.courses}
        explorePage
        totalCount={courses?.totalCount}
        paginationUrl="/contents"
      />
      <Footer />
    </>
  );
};

export default Videos;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, query, res }) => {
    const c_token = getCookie('c_token', { req, res });
    const { s_token, userId } = getToken(c_token as string);
    const page = Number(query?.page) || 1;

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
      const { data } = await axios.get(
        `/courses-user/noauth?skip=${page - 1}&take=12`,
      );
      console.log(data, data.courses.length, 8);
      store.dispatch(setCourses(data));
      return {
        props: {},
      };
    } catch (e) {
      store.dispatch(setCourses(null));
      return {
        props: {
          error: 'call failed',
        },
      };
    }
  });

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const c_token = getCookie('c_token', { req, res });
//   const { s_token, userId } = getToken(c_token as string);

//   if (!userId) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   try {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`;
//     const { data } = await axios.get('/courses-user/noauth?skip=0&take=20');
//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (e) {
//     return {
//       props: {
//         error: 'call failed',
//       },
//     };
//   }
// };
