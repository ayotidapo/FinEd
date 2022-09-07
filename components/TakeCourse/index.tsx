/* eslint-disable react-hooks/exhaustive-deps */
// import dynamic from 'next/dynamic';
import Icon from 'common/Icon';
import { useRouter } from 'next/router';
import styles from './watch.module.scss';
import { ICourse } from 'components/VideosListPage';
import { IContent } from 'components/VideoDetails';
import {
  getContentUrl,
  getLastWatchContent,
  sendContentProgress,
} from './functions';
import { useEffect, useState } from 'react';

import { ifHasVideo } from 'helpers';
import Modal from 'common/Modal';
import SubCard from 'common/SubCard';
import { useSelector } from 'store';
import TabCourseVideos from 'components/TabCourseVideos';
import TabCourseResources from 'components/TabCourseResources';
import TabCourseQuiz from 'components/TabCourseQuiz';
import CoursePlayer from 'components/WatchCoursePlayer';

import RateReview from 'components/RateReview';
import QuizPage, { IQuiz } from 'components/QuizPage';

// const ReactPlayer = dynamic(() => import('react-player'), {
//   ssr: false,
// });

interface Props {
  course: ICourse;
  quiz: IQuiz;
}

const TakeCoursePage: React.FC<Props> = (props) => {
  const { course, quiz } = props;
  const questionsLen = quiz?.questions?.length;
  const router = useRouter();
  const { contId } = router.query;

  const [loading, setLoading] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [duration, setDuration] = useState(0);
  const [latestCourseContent, setLatestCourseContent] = useState<any>(null);
  const [lastVideoEnd, setLastVideoEnd] = useState(false);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [curVidId, setCurVidId] = useState<any>(contId);
  const [step, setStep] = useState(0);
  const [x, setX] = useState(1);

  const onsetX = (act: string) => {
    if (x < 10 && act === 'nxt') setX(x + 1);
    if (x > 1 && act === 'prev') setX(x - 1);
  };
  const { user } = useSelector((state) => state?.user);
  const { plans } = useSelector((state) => state?.plans);

  const { title, contents, paid, id } = course;

  const { plan: curPlan } = user?.currentSubscription || {};

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [url, setUrl] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);

  let tHandler: any = null;

  const resources = contents?.filter(
    (content: IContent) => content.type?.toLowerCase() !== 'video',
  );
  const videos = contents?.filter(
    (content: IContent) => content.type?.toLowerCase() === 'video',
  );
  console.log(resources, videos, 90909090);
  useEffect(() => {
    const isHasVideo = ifHasVideo(contents);

    setHasVideo(isHasVideo);

    tHandler = window.setInterval(() => {
      if (contId) onSendProgress(contId as string);
    }, 2000);

    return () => {
      window.clearInterval(tHandler);
    };
  }, [contId]);

  useEffect(() => {
    if (paid && !curPlan?.id) setIsOpen(true);
    else setIsOpen(false);
  }, [user?.id, plans.length]);

  const getUrl = async (contentId: string) => {
    setShowQuiz(false);
    setCurVidId(contentId);
    setLoading(true);
    const data = await getContentUrl(contentId);
    const fileurl = data?.file?.url;
    setUrl(fileurl);

    if (data) {
      const Coursetitle = data?.title || '';
      const ContentID = contentId || '';
      let urlpath = `/take-course/${course.id}/${Coursetitle}/?contId=${ContentID}`;
      router.push(urlpath);
    }
    setLoading(false);
  };

  const onLoadPage = async () => {
    setLoading(true);

    let contentId = '';
    if (!contId) contentId = videos[0]?.id;
    else contentId = contId as string;
    setCurVidId(contentId);

    let data: any = {};
    let withcontentIDdata: any = {};

    if (contentId) {
      withcontentIDdata = await getContentUrl(contentId);
      data = withcontentIDdata;
    } else {
      const withcourseIDdata = await getLastWatchContent(course?.id);

      data = withcourseIDdata;
      if (withcourseIDdata.error === 404)
        /// withcontentIDdata = await getContentUrl(contentId);;;;
        data = withcontentIDdata;
    }

    const fileurl = data?.file?.url;
    setLatestCourseContent(data);

    setUrl(fileurl);

    if (data) {
      const Coursetitle = data?.title || '';
      const contentIDquery = contentId ? `?contId=${contentId}` : '';
      let urlpath = `/take-course/${course.id}/${Coursetitle}/${contentIDquery}`;
      router.push(urlpath);
    }
    setLoading(false);
  };

  useEffect(() => {}, [lastVideoEnd]);

  useEffect(() => {
    if (!hasVideo) return;
    onLoadPage();
  }, [hasVideo]);

  const onClickSubCard = (stp: number) => {
    setStep(stp);
  };
  const toggleQuiz = (bool: boolean) => {
    setShowQuiz(bool);
  };
  const onClose = () => {
    setIsOpen(false);
    router.push(`/video/${id}/${title}`);
  };

  const onSendProgress = async (contId: string) => {
    const player: any = document.getElementById('player');
    const progress = player ? player.currentTime : null;
    const duration = player ? player.duration : 0;
    setDuration(duration);
    // const cId = contId || curVidId;
    // console.log('pow', cId, contId, curVidId);
    const lastVidPos = videos.length - 1;
    const isLastCourseVideo = videos[lastVidPos].id === contId;

    if (isLastCourseVideo && player) {
      player.onended = () => {
        setLastVideoEnd(true);
        setIsCourseCompleted(true);
      };
    }
    await sendContentProgress(contId, Math.floor(Number(progress)));
  };

  const handleVideoMounted = (element: any) => {
    if (element !== null) {
      element.currentTime = latestCourseContent?.progress || 0;
    }
  };

  return (
    <main className={styles.watch}>
      <RateReview
        courseId={id}
        courseTitle={course?.title}
        lastVideoEnd={lastVideoEnd}
        setLastVideoEnd={setLastVideoEnd}
        hasQuiz={questionsLen > 0}
        setShowQuiz={setShowQuiz}
        isQuizCompleted={isQuizCompleted}
      />
      <Modal
        openModal={isOpen}
        onClose={onClose}
        modalClass={styles.modalClass}
        zIndex="99"
      >
        <div>
          <p className={styles.subTo}>
            Upgrade your account to view this course
          </p>
          <div style={{ display: 'flex', gap: '25px' }}>
            <SubCard
              plans={plans}
              curPlan={curPlan}
              step={step}
              onClickSubCard={onClickSubCard}
            />
          </div>
        </div>
      </Modal>
      <div className={styles.top}>
        <nav className={styles.breadcrumb}>
          <ul>
            <li style={{ marginTop: '-2px' }} onClick={() => router.push('/')}>
              <Icon id="home" height={24} width={24} className="hand" />
              <Icon
                id="caret-right"
                height={15}
                width={15}
                style={{ margin: '0 10px' }}
              />
            </li>
            <li>
              <span className="hand" onClick={() => router.push('/courses')}>
                Videos
              </span>
              <Icon
                id="caret-right"
                height={15}
                width={15}
                style={{ margin: '0 10px' }}
              />
            </li>
            <li>
              <span>{title}</span>
            </li>
          </ul>
        </nav>

        <div className={styles.controls}></div>
      </div>
      <div className={styles.wrapper}>
        <section className={styles.content_list}>
          <TabCourseVideos
            videos={videos}
            duration={duration}
            curVidId={curVidId}
            onClickTab={getUrl}
          />
          <TabCourseResources resources={resources} />
          {questionsLen > 0 && false && (
            <TabCourseQuiz
              onClickTab={toggleQuiz}
              isCourseCompleted={isCourseCompleted}
            />
          )}
        </section>

        <section className={styles.main_sec}>
          {!showQuiz && (
            <>
              <CoursePlayer
                videoRef={handleVideoMounted}
                loading={loading}
                cantWatch={paid && !curPlan?.id}
                course={course}
                hasVideo={hasVideo}
                url={url}
              />
            </>
          )}

          {showQuiz && false && (
            <QuizPage
              quiz={quiz}
              setLastVideoEnd={setLastVideoEnd}
              setIsQuizCompleted={setIsQuizCompleted}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default TakeCoursePage;
