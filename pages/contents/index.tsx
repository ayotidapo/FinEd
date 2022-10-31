import { useState } from 'react';
import VideoPage from 'components/VideosListPage';
import { getToken } from 'helpers/getToken';
import axios from 'axios';
import Footer from 'common/Footer';
import { useSelector, wrapper } from 'store';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import { setCourses } from 'reducers/courses';
import HeaderWtSearch from 'common/HeaderWtSearch';
import { MobileHeader } from 'common/Header';
import useSetNav from 'hooks/useSetNav';

interface Props {
  totalCount: number;
  [key: string]: any;
}

const Videos: React.FC<Props> = ({ totalCount }) => {
  const { open, onSetNav } = useSetNav();

  const courses: any = useSelector((state) => state.courses);

  const coursesData = courses?.courses;
  const totalCourseCount = totalCount;

  return (
    <>
      <HeaderWtSearch setNav={onSetNav} />
      {open && <MobileHeader toOpen={open} setNav={onSetNav} />}
      <VideoPage
        courses={coursesData}
        explorePage
        totalCount={totalCourseCount}
        paginationUrl="contents"
        setNav={onSetNav}
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
    let courses = [];
    let totalCount = 0;

    if (userId) {
      return {
        redirect: {
          destination: '/courses',
          permanent: false,
        },
      };
    }
    try {
      //  axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`;

      if (searchQuery) {
        // const { data } = await axios.get(
        //   `/courses-user/search-courses?skip=${
        //     (page - 1) * 12
        //   }&take=12&searchQuery=${searchQuery}`,
        // );

        const res = await fetch(
          `/courses-user/search-courses?skip=${
            (page - 1) * 12
          }&take=12&searchQuery=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${s_token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const data = await res.json();

        courses = data.courses;
        totalCount = data.totalCount;
      } else {
        // const { data } = await axios.get(
        //   `/courses-user/noauth?skip=${(page - 1) * 12}&take=12`,
        // );

        const res = await fetch(
          `/courses-user/noauth?skip=${(page - 1) * 12}&take=12`,
          {
            headers: {
              Authorization: `Bearer ${s_token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const data = await res.json();

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
      store.dispatch(setCourses(courses));
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
