import axios from 'axios';
import MyLearningPage from 'components/MyLearningPage';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
import { GetServerSideProps } from 'next';
import { setCourses } from 'reducers/courses';
import { wrapper } from 'store';

interface Props {
  data?: any;
  bookmarked?: any;
}

const MyLearning: React.FC<Props> = ({ data, bookmarked }) => {
  console.log({ newData: data });
  return (
    <>
      <MyLearningPage data={data} bookmarked={bookmarked} />
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
        const { data } = await axios.get(`/bookmarks`);

        return {
          props: {
            bookmarked: data,
          },
        };
      }

      const { data } = await axios.get(
        `/courses-user/my-learning?skip=0&take=20&progress=${tab}`,
      );

      return {
        props: {
          data,
        },
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
