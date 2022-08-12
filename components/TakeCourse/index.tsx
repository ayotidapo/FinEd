/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import Icon from 'common/Icon';
import cx from 'classnames';
import LabelTag from 'common/LabelTag';
import { useRouter } from 'next/router';
import styles from './watch.module.scss';
import { ICourse } from 'components/VideosListPage';
import { IContent } from 'components/VideoDetails';
import { getContentUrl, sendContentProgress } from './functions';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BtnLoader } from 'common/Button';
import { ifHasVideo } from 'helpers';
import Modal from 'common/Modal';
import SubCard from 'common/SubCard';
import { useSelector } from 'store';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

interface Props {
  course: ICourse;
  latestCourseContent: ICourse;
}
const TakeCoursePage: React.FC<Props> = (props) => {
  const { course, latestCourseContent } = props;

  const router = useRouter();
  const { contId } = router.query;
  const [loading, setLoading] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [duration, setDuration] = useState('');
  const [curVidId, setCurVidId] = useState(contId);
  const [step, setStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef();
  const { user } = useSelector((state) => state?.user?.user);
  const { plans } = useSelector((state) => state?.plans);

  const { title, description, contents, categories, level, paid, id } = course;

  const { plan: curPlan } = user?.currentSubscription || {};

  const cantWatch = paid && !curPlan?.id;
  const [isOpen, setIsOpen] = useState(cantWatch);

  const [url, setUrl] = useState('');

  // const isVideo = (type: string) => type.toLowerCase() === 'video';

  const resources = contents.filter(
    (content: IContent) => content.type?.toLowerCase() !== 'video',
  );
  const videos = contents.filter(
    (content: IContent) => content.type?.toLowerCase() === 'video',
  );
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];

  // const onReady = useCallback(() => {
  //   // if (!isReady) {
  //   //   const timeToStart = 7 * 60 + 12.6;
  //   //   playerRef.current?.seekTo(timeToStart, 'seconds');
  //   //   setIsReady(true);
  //   // }

  //   if (playerRef.current) {
  //     const timeToStart = 7 * 60 + 12.6;
  //     console.log('seeking to', timeToStart);
  //     playerRef.current.seekTo(timeToStart);
  //   }
  // }, [isReady]);

  useEffect(() => {
    const isHasVideo = ifHasVideo(contents);
    console.log(playerRef.current);
    setHasVideo(isHasVideo);
    return () => {
      // onSendProgress();
    };
  }, []);

  const getUrl = async (courseVideoId: string) => {
    setLoading(true);
    setCurVidId(courseVideoId);
    const data = await getContentUrl(courseVideoId);
    const fileurl = data?.file?.url;
    setUrl(fileurl);
    if (data) {
      router.push(
        `/take-course/${course.id}/${data.title}/?contId=${courseVideoId}`,
      );
    }
    setLoading(false);
  };

  const handleDuration = (duration: any) => {
    setDuration(duration);
  };

  const onClickSubCard = (stp: number) => {
    setStep(stp);
  };

  const onClose = () => {
    setIsOpen(false);
    router.push(`/video/${id}/${title}`);
  };

  const onSendProgress = async () => {
    const progress = localStorage.getItem('tvp_') || 0;

    await sendContentProgress(id, Number(progress));
  };

  useEffect(() => {
    let videoId = '';
    if (!contId) videoId = videos[0]?.id;
    else videoId = contId as string;
    getUrl(videoId);
  }, []);

  return (
    <main className={styles.watch}>
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
          <p onClick={() => onSendProgress()}>Course content</p>

          <div className={styles.content}>
            <ul>
              {videos.map((video: IContent, i: number) => (
                <li
                  key={video.id}
                  className={cx('hand', {
                    [styles.active_vid]: video.id === curVidId,
                  })}
                  onClick={() => getUrl(video.id)}
                >
                  <abbr title={video.title} className={`elips ${styles.f_sp}`}>
                    <a>
                      <Icon id="play" width={18} height={18} />
                      &nbsp;{video.title}
                    </a>
                  </abbr>
                  <a>
                    <Icon id="clock" width={18} height={18} />
                    &nbsp;{(Number(duration) / 60).toFixed(2)} mins
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p>Resource</p>
          <div className={styles.content}>
            <ul>
              {resources.map((resource: IContent, i: number) => (
                <li key={i} className="hand">
                  <abbr
                    title={resource.title}
                    className={`elips  ${styles.f_sp} ${styles.r_l}`}
                  >
                    <a download>
                      <Icon id="file" width={20} height={20} />
                      &nbsp;{resource.title}
                    </a>
                  </abbr>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.main_sec}>
          <div className={styles.video_player}>
            {!loading ? (
              <>
                {!hasVideo && (
                  <div className="error-big abs-center">
                    This course has no video content
                  </div>
                )}
                {!cantWatch && (
                  <ReactPlayer
                    url={url}
                    controls
                    width="100%"
                    height="100%"
                    ref={playerRef}
                    onProgress={(progress) => {
                      localStorage.setItem('tvp_', `${progress.playedSeconds}`);
                    }}
                    onDuration={handleDuration}
                    //  onReady={onReady}
                    playing
                    onSeek={(e: number) => console.log('onSeek', e)}
                  />
                )}
              </>
            ) : (
              <BtnLoader classStyle="abs-center" />
            )}
          </div>
          <div className={styles.details}>
            <h2 className="title">{title}</h2>
            <div className={styles.barz_clock}>
              <div className={`${level} ${styles.min_details}`}>
                <span>
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  &nbsp;{level}
                </span>
                {duration && (
                  <span>
                    &nbsp;&nbsp;&nbsp;
                    <Icon id="clock" width={20} height={20} />
                    &nbsp;9 mins
                  </span>
                )}
              </div>
              <div>
                {categories.slice(0, 3).map((cat, i) => (
                  <LabelTag key={i} color={colors[i]}>
                    {cat}
                  </LabelTag>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '50px' }}>
              <p className={styles.summary}>Summary of this video</p>
              <span>{description}</span>
            </div>
            <div style={{ width: '250px' }}>
              <p>Relevant links</p>
              <div className={styles.reference}>
                <a
                  target="_blank"
                  href="https://www.google.com"
                  rel="noopener noreferrer"
                >
                  https://twitter.com/cci_lagos
                </a>
                <a target="_blank" href="/" rel="noopener noreferrer">
                  https://twitter.com/cci_lagos
                </a>
                <a target="_blank" href="/" rel="noopener noreferrer">
                  https://twitter.com/cci_lagos
                </a>
                <a target="_blank" href="/" rel="noopener noreferrer">
                  https://twitter.com/cci_lagos
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TakeCoursePage;
