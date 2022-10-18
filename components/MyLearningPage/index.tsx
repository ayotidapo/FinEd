/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'common/Button';
import EmptyView from 'common/EmptyView';
import Icon from 'common/Icon';
import LabelTag from 'common/LabelTag';
import Progressbar from 'common/ProgressBar';
import Star from 'common/Star';
import VideoCard from 'common/VideoCard';
import { courseVideos, formatDate } from 'helpers';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ICourse } from 'reducers/courses';
import { useSelector } from 'store';

import styles from './learning.module.scss';

interface Props {}

const MyLearningPage: React.FC<Props> = () => {
  const router = useRouter();
  const tab = router.query?.tab || 'ongoing';
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];

  const { courses, bookmarkCourses }: any = useSelector(
    (state) => state.courses,
  );

  const [courseArray, setCourseArray] = useState<ICourse[]>(courses);

  const textHeader = tab === 'ongoing' ? 'Last Viewed' : `Courses`;

  const lastViewed: ICourse = courses[0];

  const rating = Math.round(lastViewed?.rating);

  const ayraStars = Array.from(new Array(5).keys());

  const onSetTab = (tab: string) => {
    router.push(`/my-learning?tab=${tab}`);
  };

  useEffect(() => {
    let contentLen = 0;

    if (lastViewed?.contents) {
      const videos = courseVideos(lastViewed.contents);
      contentLen = videos.length;
    }
  }, [lastViewed?.id]);

  const onContinueCourse = () => {
    router.push(`/take-course/${lastViewed?.id}/${lastViewed.title}`);
  };

  useEffect(() => {
    if (tab === 'bookmarked') {
      setCourseArray(bookmarkCourses);
    } else {
      setCourseArray(courses);
    }
  }, [tab]);

  const unBookMarkCourse = (id: string) => {
    if (tab === 'bookmarked') {
      const onlybookmark = courseArray.filter((course) => course.id !== id);
      setCourseArray(onlybookmark);
    }
  };

  return (
    <>
      <div className={styles.topheader}>
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
        {tab === 'ongoing' && lastViewed?.title && (
          <section className={styles.lastviewed_details}>
            <div>
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
                <h2>
                  <abbr title={lastViewed?.title} className="title elips">
                    {lastViewed?.title}
                  </abbr>
                </h2>
                <div className={styles.rating_div}>
                  {ayraStars.map((n, i) => (
                    <Star key={n} id={i} rating={rating - 1} />
                  ))}
                  &nbsp;{rating > 0 && rating}
                  <span style={{ color: '#7C7C7C' }} className={styles.date}>
                    &nbsp;&nbsp;&nbsp;Updated{' '}
                    {formatDate(lastViewed?.updatedAt)}
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
                    &nbsp;
                  </span>
                </div>
                <div className={styles.progressbar}>
                  <Progressbar progress={lastViewed?.analyticProgress} />
                </div>
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
              <div className={styles.btnDv}>
                <Button bg="#c03e21" onClick={onContinueCourse}>
                  Continue course <Icon id="arrow-right" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {courseArray.length < 1 && <EmptyView contentName={`${tab} course`} />}

        <section className={styles.content_items_wrap}>
          {courseArray?.map((course: any) => (
            <VideoCard
              key={course.id}
              course={course}
              unBookMarkFunc={unBookMarkCourse}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default MyLearningPage;
