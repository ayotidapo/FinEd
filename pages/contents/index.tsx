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
import { useEffect, useState } from 'react';
import { handleSearch } from 'utils/handleSearch';

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

  const [searchResult, setSearchResult] = useState<ICourse[]>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  useEffect(() => {
    const handler = setTimeout(async() => {
      let searchQuery = search.value;
      const {courses, totalCount} = await handleSearch(searchQuery);
      setSearchResult(courses);
      setTotalPageCount(totalCount);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search, search.value]);

  const coursesData = searchResult.length ? searchResult : courses?.courses;
  const totalCourseCount = totalPageCount ? totalPageCount : totalCount;

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
      const { data } = await axios.get(
        `/courses-user/noauth?skip=${(page - 1) * 12}&take=12`,
      );

      store.dispatch(setCourses(data?.courses));

      if (page > 1 && data?.courses?.length < 1) {
        return {
          notFound: true,
        };
      }

      return {
        props: { totalCount: data.totalCount },
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
