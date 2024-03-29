import { GetServerSideProps } from 'next';
import axios from 'helpers/axios';
import MyLearningPage from 'components/MyLearningPage';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { ICourse, setBookMarkCourses, setCourses } from 'reducers/courses';
import { wrapper } from 'store';

interface Props {
  token: string;
}

const MyLearning: React.FC<Props> = ({ token }) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return (
    <>
      <MyLearningPage />
    </>
  );
};

export default MyLearning;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, query, res }) => {
    const c_token = getCookie('c_token', { req, res });
    const { s_token, userId } = getToken(c_token as string);
    const tab = query?.tab || 'ongoing';

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

      if (tab === 'bookmarked') {
        const { data: courses } = await axios.get(`/bookmarks`);

        // const res = await fetch(`https://api.themoneystaging.com/bookmarks`, {
        //   headers: {
        //     Authorization: `Bearer ${s_token}`,
        //     'Content-Type': 'application/json',
        //   },
        // });

        // const courses = await res.json();

        const addBk2courses = courses.map((course: ICourse) => ({
          ...course,
          bookmark: { id: 'fake-id' },
        }));

        store.dispatch(setBookMarkCourses(addBk2courses));
        return {
          props: { token: s_token },
        };
      }

      const { data } = await axios.get(
        `/courses-user/my-learning?skip=0&take=20&progress=${tab}`,
      );

      // const res = await fetch(
      //   `https://api.themoneystaging.com/courses-user/my-learning?skip=0&take=20&progress=${tab}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${s_token}`,
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );

      // const data = await res.json();

      const analytics = data?.analytics;
      const courses = analytics.map((analytic: any) => ({
        ...analytic?.course,
        analyticProgress: analytic?.progress,
        analyticDateCreated: analytic?.datecreated,
        analyticDateUpreated: analytic?.dateupdated,
      }));

      store.dispatch(setCourses(courses));

      return {
        props: { token: s_token },
      };
    } catch (e) {
      store.dispatch(setCourses([]));
      return {
        props: {
          error: 'call failed',
        },
      };
    }
  });
