import VideoPage, { ICourse } from 'components/VideosListPage';
import { getToken } from 'helpers/getToken';
import axios from 'axios';
import Footer from 'common/Footer';
import { useSelector, wrapper } from 'store';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import { setCourses } from 'reducers/courses';
import HeaderWtSearch from 'common/HeaderWtSearch';
import useForm from 'hooks/useForm';

interface Props {
  totalCount: number;
  [key: string]: any;
}

const Videos: React.FC<Props> = ({ totalCount }) => {
  const courses: any = useSelector((state) => state.courses);

  const fields = {
    search: {
      name: 'search',
      value: '',
      label: '',
      type: 'text',
      placeholder: 'search',
      error: '',
    },
  };

  const { onChangeInput, inputs } = useForm(fields);
  const { search } = inputs;

  const coursesData = courses?.courses;
  const totalCourseCount = totalCount;

  return (
    <>
      <HeaderWtSearch onChangeInput={onChangeInput} search={search} />
      <VideoPage
        courses={coursesData}
        explorePage
        totalCount={totalCourseCount}
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
    const searchQuery = query?.s || '';

    if (userId) {
      return {
        redirect: {
          destination: '/courses',
          permanent: false,
        },
      };
    }
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`;
      let courses = [];
      let totalCount = 0;

      if (searchQuery) {
        const { data } = await axios.get(
          `/courses-user/search-courses?skip=${
            (page - 1) * 12
          }&take=12&searchQuery=${searchQuery}`,
        );
        courses = data.courses;
        totalCount = data.totalCount;
      } else {
        const { data } = await axios.get(
          `/courses-user/noauth?skip=${(page - 1) * 12}&take=12`,
        );
        courses = data.courses;
        totalCount = data.totalCount;
      }

      store.dispatch(setCourses(courses));

      const emptyCourse = courses?.length < 1;

      if ((page > 1 && emptyCourse) || (searchQuery && emptyCourse)) {
        return {
          notFound: true,
        };
      }

      return {
        props: { totalCount },
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
