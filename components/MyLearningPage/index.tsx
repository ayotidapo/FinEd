/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'common/Button';
import HeaderLoggedIn from 'common/HeaderLoggedIn';
import Icon from 'common/Icon';
import LabelTag from 'common/LabelTag';
import Progressbar from 'common/ProgressBar';
import Star from 'common/Ratings';
import VideoCard from 'common/VideoCard';
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
    (objA: any, objB: any) =>
      Number(objA.dateupdated) - Number(objB.dateupdated),
  );

const MyLearningPage: React.FC<Props> = ({ data }) => {
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];
  const router = useRouter();
  const analytics: any = data?.analytics || [];
  console.log(analytics, 'o');
  const onSetTab = (tab: string) => {
    router.push(`/my-learning?tab=${tab}`);
  };

  useEffect(() => {
    sortedAsc(analytics);
  }, []);

  const { tab } = router.query || {};
  const textHeader = tab === 'ongoing' ? 'Last Viewed' : `Courses`;
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
              <Image src="/assets/bag.png" layout="fill" alt="" />
              <span>
                <Icon id="play" />
              </span>
              <div className={styles.overlay} />
            </div>
            <div className={styles.midBx}>
              <h2 className="title">
                What is a Tax Free Savings Account (TFSA)
              </h2>
              <div className={styles.rating_div}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} />
                ))}
                &nbsp;4.3
                <span style={{ color: '#7C7C7C' }}>
                  &nbsp;&nbsp;&nbsp;Updated Aug 9, 2021
                </span>
              </div>
              <div className={`Intermediate ${styles.min_details}`}>
                <span>
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  &nbsp;Intermediate
                </span>
                <span>
                  &nbsp;&nbsp;&nbsp;
                  <Icon id="clock" width={20} height={20} />
                  &nbsp;9 mins
                </span>
              </div>
              <div className={styles.progressbar}>
                <Progressbar />
              </div>
            </div>
            <div className={styles.lblBx}>
              <span className={styles.labeltag}>
                {['shsh', 'hhhd', 'jfjfjfj', 'oeoeo']
                  .slice(0, 3)
                  .map((category, i) => (
                    <LabelTag key={category} color={colors[i]}>
                      {category}
                    </LabelTag>
                  ))}
                {['shsh', 'hhhd', 'jfjfjfj', 'oeoeo'].length > 3 && (
                  <LabelTag>+3</LabelTag>
                )}
              </span>
              <div style={{ width: '180px' }}>
                <Button bg="#c03e21">
                  Continue course <Icon id="arrow-right" />
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className={styles.content_items_wrap}>
          {analytics.map(({ course, progress }: any) => (
            <VideoCard key={course.id} course={course} />
          ))}
        </section>
      </main>
    </>
  );
};

export default MyLearningPage;
