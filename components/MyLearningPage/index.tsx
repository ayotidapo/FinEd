/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'common/Button';
import EmptyView from 'common/EmptyView';
import HeaderLoggedIn from 'common/HeaderLoggedIn';
import Icon from 'common/Icon';
import LabelTag from 'common/LabelTag';
import Progressbar from 'common/ProgressBar';
import Star from 'common/Ratings';
import VideoCard from 'common/VideoCard';
import { courseVideos, formatDate, getCourseProgressPerc } from 'helpers';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ICourse } from 'reducers/courses';

import styles from './learning.module.scss';

interface Props {
  data?: any;
  bookmarked?: any;
}

const sortedAsc = (arr: any[], key: string) => {
  return arr.sort(
    (objA: any, objB: any) => Date.parse(objA[key]) - Date.parse(objB[key]),
  );
};

const MyLearningPage: React.FC<Props> = ({ data, bookmarked }) => {
  const router = useRouter();
  const tab = router.query?.tab || 'ongoing';
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];

  const analytics: any = data?.analytics || [];
  const [sortedAnalytics, setSortedAnalytics] = useState<ICourse[]>([]);
  const [lastAnalytics, setLastAnalytics] = useState<any>({});
  const textHeader = tab === 'ongoing' ? 'Last Viewed' : `Courses`;

  const lastViewed: ICourse = lastAnalytics?.course;

  const rating = Math.round(lastViewed?.rating);

  const ayraStars = Array.from(new Array(5).keys());

  const onSetTab = (tab: string) => {
    router.push(`/my-learning?tab=${tab}`);
  };

  console.log('analytics', analytics);

  useEffect(() => {
    const sortedAnalytiks = sortedAsc(analytics, 'dateupdated');

    setSortedAnalytics(sortedAnalytiks);

    const lastAnalytics = sortedAnalytiks[0];

    setLastAnalytics(lastAnalytics);
  }, [tab]);
  console.log({ analytics: analytics, sortedAnalytics, lastAnalytics }, tab);

  useEffect(() => {
    let contentLen = 0;
    const numberWatched = lastAnalytics?.progress;

    if (lastViewed?.contents) {
      const videos = courseVideos(lastViewed.contents);
      contentLen = videos.length;
      const percProgress = getCourseProgressPerc(contentLen, numberWatched);
      const updateLastAnalytics = { ...lastAnalytics, progress: percProgress };
      setLastAnalytics(updateLastAnalytics);
      console.log(contentLen, numberWatched, 'iro', videos);
    }
  }, [lastViewed?.id]);

  const onContinueCourse = () => {
    //   router.push(
    //  //  `/take-course/${lastViewed?.id}/${data.title}/?contId=${courseVideoId}`,
    //   );
  };
  let dataArray = analytics;
  if (tab === 'bookmarked') {
    dataArray = bookmarked;
  }
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
                  ?.slice(0, 2)
                  .map((category: any, i: number) => (
                    <LabelTag key={category} color={colors[i]}>
                      {category}
                    </LabelTag>
                  ))}
                {lastViewed?.categories?.length > 2 && (
                  <LabelTag>+ {lastViewed?.categories?.length - 2}</LabelTag>
                )}
              </span>
              <div style={{ width: '180px' }}>
                <Button bg="#c03e21" onClick={onContinueCourse}>
                  Continue course <Icon id="arrow-right" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {dataArray.length < 1 && <EmptyView contentName={`${tab} course`} />}

        <section className={styles.content_items_wrap}>
          {dataArray?.map(({ course }: any) => (
            <VideoCard key={course.id} course={course} />
          ))}
        </section>
      </main>
    </>
  );
};

export default MyLearningPage;
