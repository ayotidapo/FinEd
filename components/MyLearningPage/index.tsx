/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'common/Button';
import EmptyView from 'common/EmptyView';
import HeaderLoggedIn from 'common/HeaderLoggedIn';
import Icon from 'common/Icon';
import LabelTag from 'common/LabelTag';
import Progressbar from 'common/ProgressBar';
import Star from 'common/Ratings';
import VideoCard from 'common/VideoCard';
import { formatDate } from 'helpers';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ICourse } from 'reducers/courses';
import { useSelector } from 'store';
import styles from './learning.module.scss';

interface Props {
  data: any;
}

const sortedAsc = (arr: any[]) =>
  arr.sort(
    (objA: any, objB: any) => Number(objA.updatedAt) - Number(objB.updatedAt),
  );

const MyLearningPage: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const tab = router.query?.tab || 'ongoing';
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];

  const analytics: any = data?.analytics || [];
  const [sortedCourses, setSortedCourses] = useState<ICourse[]>([]);
  const [lastAnalytics, setLastAnalytics] = useState<any>({});
  const textHeader = tab === 'ongoing' ? 'Last Viewed' : `Courses`;
  const lastViewed = sortedCourses[0];

  const rating = Math.round(lastViewed?.rating);

  const ayraStars = Array.from(new Array(5).keys());

  const onSetTab = (tab: string) => {
    router.push(`/my-learning?tab=${tab}`);
  };

  useEffect(() => {
    const analyCourses = analytics.map((analytic: any) => analytic.course);

    const sortCourses = sortedAsc(analyCourses);

    setSortedCourses(sortCourses);

    const lastAnalytics = analytics.find(
      (analytics: any) => analytics?.course?.id === sortCourses[0]?.id,
    );

    setLastAnalytics(lastAnalytics);
  }, [tab]);

  console.log({ newAnalytics: analytics }, tab);
  return (
    <>
      <div className={styles.topheader}>
        <HeaderLoggedIn />
        <section className={styles.section}>
          <h2 className="title">My Learning</h2>
          <nav className={`navi ${styles.navUl}`}>
            <ul className={styles.uli}>
              <li
                onClick={() => onSetTab('ongoing')}
                className={tab === 'ongoing' ? 'activelnk' : ''}
              >
                Ongoing
              </li>
              <li
                onClick={() => onSetTab('bookmarked')}
                className={tab === 'bookmarked' ? 'activelnk' : ''}
              >
                Bookmarked
              </li>
              <li
                onClick={() => onSetTab('completed')}
                className={tab === 'completed' ? 'activelnk' : ''}
              >
                Completed
              </li>
            </ul>
          </nav>
        </section>
      </div>
      <main className={styles.main}>
        <h2 className="title">{textHeader}</h2>
        {tab === 'ongoing' && (
          <section className={styles.lastviewed_details}>
            <div className={styles.imgBx}>
              {lastViewed?.thumbnail && (
                <Image
                  src={lastViewed?.thumbnail?.url}
                  layout="fill"
                  alt="alu"
                />
              )}
              <span>
                <Icon id="play" />
              </span>
              <div className={styles.overlay} />
            </div>
            <div className={styles.midBx}>
              <h2 className="title">{lastViewed?.title}</h2>
              <div className={styles.rating_div}>
                {ayraStars.map((n, i) => (
                  <Star key={n} id={i} rating={rating - 1} />
                ))}
                &nbsp;{rating > 0 && rating}
                <span style={{ color: '#7C7C7C' }}>
                  &nbsp;&nbsp;&nbsp;Updated {formatDate(lastViewed?.updatedAt)}
                </span>
              </div>
              <div className={`${lastViewed?.level} ${styles.min_details}`}>
                <span>
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  &nbsp;{lastViewed?.level}
                </span>
                <span>
                  &nbsp;&nbsp;&nbsp;
                  <Icon id="clock" width={20} height={20} />
                  &nbsp;9 mins
                </span>
              </div>
              <div className={styles.progressbar}>
                <Progressbar progress={lastAnalytics?.progress} />
              </div>
            </div>
            <div className={styles.lblBx}>
              <span className={styles.labeltag}>
                {lastViewed?.categories
                  ?.slice(0, 3)
                  .map((category: any, i: number) => (
                    <LabelTag key={category} color={colors[i]}>
                      {category}
                    </LabelTag>
                  ))}
                {lastViewed?.categories?.length > 3 && <LabelTag>+3</LabelTag>}
              </span>
              <div style={{ width: '180px' }}>
                <Button bg="#c03e21">
                  Continue course <Icon id="arrow-right" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {sortedCourses.length < 1 && (
          <EmptyView contentName={`${tab} course`} />
        )}

        <section className={styles.content_items_wrap}>
          {sortedCourses?.map((course: any) => (
            <VideoCard key={course.id} course={course} />
          ))}
        </section>
      </main>
    </>
  );
};

export default MyLearningPage;
