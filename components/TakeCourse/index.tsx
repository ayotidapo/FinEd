/* eslint-disable react-hooks/exhaustive-deps */
// import dynamic from 'next/dynamic';
import Icon from 'common/Icon';
import cx from 'classnames';
import LabelTag from 'common/LabelTag';
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
import { BtnLoader } from 'common/Button';
import { ifHasVideo, toTimeString } from 'helpers';
import Modal from 'common/Modal';
import SubCard from 'common/SubCard';
import { useSelector } from 'store';

// const ReactPlayer = dynamic(() => import('react-player'), {
//   ssr: false,
// });

interface Props {
  course: ICourse;
}
const TakeCoursePage: React.FC<Props> = (props) => {
  const { course } = props;

  const router = useRouter();
  const { contId } = router.query;
  const [loading, setLoading] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [duration, setDuration] = useState(0);
  const [latestCourseContent, setLatestCourseContent] = useState<any>(null);

  const [curVidId, setCurVidId] = useState(contId);
  const [step, setStep] = useState(0);

  const { user } = useSelector((state) => state?.user?.user);
  const { plans } = useSelector((state) => state?.plans);

  const { title, description, contents, categories, level, paid, id } = course;
  console.log(contId, curVidId, 8999);
  const { plan: curPlan } = user?.currentSubscription || {};

  const cantWatch = paid && !curPlan?.id;
  const [isOpen, setIsOpen] = useState(cantWatch);

  const [url, setUrl] = useState('');

  let tHandler: any = null;

  const resources = contents.filter(
    (content: IContent) => content.type?.toLowerCase() !== 'video',
  );
  const videos = contents.filter(
    (content: IContent) => content.type?.toLowerCase() === 'video',
  );
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];

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

  const getUrl = async (contentId: string) => {
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

  const onClickSubCard = (stp: number) => {
    setStep(stp);
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
    await sendContentProgress(contId, Math.floor(Number(progress)));
  };
  console.log(latestCourseContent);
  const handleVideoMounted = (element: any) => {
    if (element !== null) {
      element.currentTime = latestCourseContent?.progress || 0;
    }
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
        withcontentIDdata = await getContentUrl(contentId);
      data = withcontentIDdata;
    }

    const fileurl = data?.file?.url;
    setLatestCourseContent(data);
    console.log(data, 4);
    setUrl(fileurl);

    if (data) {
      const Coursetitle = data?.title || '';
      const ContentID = contentId || '';
      let urlpath = `/take-course/${course.id}/${Coursetitle}/?contId=${ContentID}`;
      router.push(urlpath);
    }
    setLoading(false);
  };

  useEffect(() => {
    onLoadPage();
  }, []);
  console.log(hasVideo, 78);
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
          <p>Course content</p>

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
                    &nbsp;{toTimeString(duration)}
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
                  <>
                    <video
                      id="player"
                      style={{ width: '100%', height: '100%' }}
                      controls
                      ref={handleVideoMounted}
                    >
                      <source src={url} type="video/mp4" />
                      Your browser does not support this video player.
                      <br /> Try update to latest version.
                    </video>
                  </>
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
