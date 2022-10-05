/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import VideoPage from 'components/VideosListPage';
import Modal from 'common/Modal';
import { getToken } from 'helpers/getToken';
import axios from 'axios';
import Footer from 'common/Footer';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import { setCourses } from 'reducers/courses';
import { useSelector, wrapper } from 'store';
import Button from 'common/Button';
import Icon from 'common/Icon';

interface Props {
  totalCount: number;
  token: string;
  [key: string]: any;
}

const Videos: React.FC<Props> = ({ totalCount, token }) => {
  const courses: any = useSelector((state) => state.courses);
  const [isOpen, setIsOpen] = useState(false);
  const { user }: any = useSelector((state) => state.user);

  const { dob, residentCountry, residentState, gender, id } = user;
  const router = useRouter();

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    const completeInfo = dob && residentCountry && residentState && gender;
    if (!completeInfo && id) setIsOpen(true);
    else setIsOpen(false);
  }, [user]);

  return (
    <>
      <VideoPage
        courses={courses?.courses}
        totalCount={totalCount}
        paginationUrl="courses"
      />
      <Footer />
      <Modal openModal={isOpen} onClose={() => setIsOpen(false)} isBodyClose>
        <div className="updateInfo">
          <div className="imgDiv">
            <Image
              src="/assets/update-info.png"
              alt="update-user-info"
              layout="fill"
            />
          </div>
          <div className="complete-info">
            <h2 className="title">We need more information from you.</h2>
            <p>
              We require you to complete all your account information such as (
              <strong>gender,date of birth,your state &amp; country </strong>{' '}
              etc...) This will help to keep your account more secure and
              protected.
            </p>
            <div style={{ textAlign: 'right' }}>
              <Button bg="#C03E21" onClick={() => router.push('/settings')}>
                Yes, Continue
                <Icon id="arrow-right" />
              </Button>
            </div>
          </div>
        </div>
      </Modal>
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
    const category = query?.category || '';
    const level = query?.level || '';

    let courses = [];
    let totalCount = 0;

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
          `/courses-user/?skip=${
            (page - 1) * 12
          }&take=12&category=${category}&level=${level}`,
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
        props: {
          totalCount,
          token: s_token,
        },
      };
    } catch (e: any) {
      console.log(e?.response?.data, { courses });
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
