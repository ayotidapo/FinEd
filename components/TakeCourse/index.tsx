/* eslint-disable react-hooks/exhaustive-deps */
// import dynamic from 'next/dynamic';
import axios from 'helpers/axios';
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
import QuizPage from 'components/QuizPage';

interface Props {
  course: ICourse;
}

const TakeCoursePage: React.FC<Props> = (props) => {
  const { course } = props;
  const router = useRouter();
  const { contId } = router.query;

  const [showNavs, setShowNavs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);
  const [latestCourseContent, setLatestCourseContent] = useState<any>(null);
  const [lastVideoEnd, setLastVideoEnd] = useState(false);

  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [curVidId, setCurVidId] = useState<any>(contId);
  const [step, setStep] = useState(0);
  const [curPlaying, setCurPlaying] = useState(0);
  const [quiz, setQuiz] = useState<any>({});

  const { user } = useSelector((state) => state?.user);
  const { plans } = useSelector((state) => state?.plans);

  const { title, contents, paid, id } = course;

  const questionsLen = quiz?.questions?.length;

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

  const contentIDs = videos.map((content: IContent) => content.id);
  const contLen = contentIDs.length;

  const cantNext = curPlaying === contLen - 1;
  const cantPrev = curPlaying === 0;

  const getQuiz = async () => {
    const { data: quiz } = await axios.get(`/quizes/course/${id}`);
    setQuiz(quiz);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isHasVideo = ifHasVideo(contents);
    setHasVideo(isHasVideo);

    // tHandler = window.setInterval(() => {
    if (contId) onSendProgress(contId as string);
    //}, 2000);

    getQuiz(); // get course Quiz

    const curIndex = contentIDs.findIndex(
      (itemId: string) => itemId === contId,
    );

    if (curIndex < 0) setCurPlaying(0);
    else setCurPlaying(curIndex);

    // return () => {
    //   window.clearInterval(tHandler);
    // };
  }, [contId]);

  useEffect(() => {
    if (paid && !curPlan?.id) setIsOpen(true);
    else setIsOpen(false);
  }, [user?.id, plans.length]);

  const onNavigateVideo = async (stage: string) => {
    let indexToPlay = 0;

    if (stage === 'nxt') {
      if (cantNext) return;
      indexToPlay = curPlaying < contLen - 1 ? curPlaying + 1 : curPlaying;
    } else if (stage === 'prv') {
      if (cantPrev) return;
      indexToPlay = curPlaying > 0 ? curPlaying - 1 : curPlaying;
    }

    setLoading(true);

    setCurPlaying(indexToPlay);

    const contentId = contentIDs[indexToPlay];
    setCurVidId(contentId);

    const data = await getContentUrl(contentId);
    const fileurl = data?.file?.url;
    setUrl(fileurl);

    if (data) {
      const Videotitle = data?.title || '';
      const ContentID = contentId || '';
      let urlpath = `/take-course/${course.id}/${Videotitle}/?contId=${ContentID}`;
      router.push(urlpath);
    }
    setLoading(false);
  };

  const getUrl = async (contentId: string) => {
    setShowQuiz(false);
    setCurVidId(contentId);
    setLoading(true);
    const data = await getContentUrl(contentId);
    const fileurl = data?.file?.url;
    setUrl(fileurl);

    if (data) {
      const Videotitle = data?.title || '';
      const ContentID = contentId || '';
      let urlpath = `/take-course/${course.id}/${Videotitle}/?contId=${ContentID}`;
      console.log(
        `/take-course/${course.id}/${Videotitle}/?contId=${ContentID}`,
      );
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
      const Videotitle = data?.title || '';
      const contentIDquery = contentId ? `?contId=${contentId}` : '';
      let urlpath = `/take-course/${course.id}/${Videotitle}/${contentIDquery}`;
      router.push(urlpath);
    }
    setLoading(false);
  };

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

  const markAsCourseComplete = async () => {
    await axios.patch(`/analytics/course/${id}`, { progress: 100 });
  };

  const onSendProgress = async (contId: string) => {
    if (typeof window === 'undefined') return;
    const player: any = document.getElementById('player');
    const progress = player ? player.currentTime : null;
    const duration = player ? player.duration : 0;
    setDuration(duration);

    const lastVidPos = videos.length - 1;
    const isLastCourseVideo = videos[lastVidPos].id === contId;

    if (isLastCourseVideo && player) {
      player.onended = () => {
        setLastVideoEnd(true);
        setIsCourseCompleted(true);
        markAsCourseComplete();
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
      {/* RateReview component house the modal display views that happens on the /take-course page */}
      <RateReview
        courseId={id}
        courseTitle={course?.title}
        lastVideoEnd={lastVideoEnd}
        setLastVideoEnd={setLastVideoEnd}
        hasQuiz={questionsLen > 0}
        setShowQuiz={setShowQuiz}
        isQuizCompleted={isQuizCompleted}
        score={score}
        totalQuestion={questionsLen}
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
        <div className={styles.controls}>
          <span
            className={cantPrev ? styles.no_allow : styles.allow}
            onClick={() => onNavigateVideo('prv')}
          >
            <Icon id="play-prev" /> Previous
          </span>
          <span
            className={cantNext ? styles.no_allow : styles.allow}
            onClick={() => onNavigateVideo('nxt')}
          >
            Next <Icon id="play-next" />
          </span>
        </div>
      </div>
      <div className={styles.wrapper}>
        <section
          className={`${styles.content_list} ${showNavs ? '' : styles.hideIt}`}
        >
          <span className={styles.close_videotab}>
            <Icon
              id="close-videotab"
              width={94}
              height={94}
              onClick={() => setShowNavs(false)}
            />
          </span>
          <TabCourseVideos
            videos={videos}
            duration={duration}
            curVidId={curVidId}
            onClickTab={getUrl}
          />
          <TabCourseResources resources={resources} />
          {questionsLen > 0 && (
            <TabCourseQuiz
              onClickTab={toggleQuiz}
              isCourseCompleted={isCourseCompleted}
            />
          )}
        </section>

        <section className={styles.main_sec}>
          {!showNavs && (
            <p
              className={styles.view_Mcontents}
              onClick={() => setShowNavs(true)}
            >
              <span>
                <Icon id="hamburger" />
              </span>
              View Course Content
            </p>
          )}
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

          {showQuiz && (
            <QuizPage
              quiz={quiz}
              setLastVideoEnd={setLastVideoEnd}
              setIsQuizCompleted={setIsQuizCompleted}
              setScore={setScore}
            />
          )}
        </section>
        {showNavs && <div className={styles.simulate}></div>}
      </div>
    </main>
  );
};

export default TakeCoursePage;

// const ReactPlayer = dynamic(() => import('react-player'), {
//   ssr: false,
// });
