/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'common/Button';
import { useRouter } from 'next/router';
import Icon from 'common/Icon';
import LabelTag from 'common/LabelTag';
import Star from 'common/Star';
import Image from 'next/image';
import styles from './videodetails.module.scss';
import { ICourse } from 'components/VideosListPage';
import { useEffect, useState } from 'react';
import Modal from 'common/Modal';
import SubCard from 'common/SubCard';
import { useSelector } from 'store';
import { IPlan } from 'reducers/plans';
import Ratings from 'common/Ratings';
import { firstLetter, formatDate } from 'helpers';

interface Props {
  course: ICourse;
  plans: IPlan[];
  reviews?: { [key: string]: any };
}

export interface IContent {
  duration: 0;
  id: string;
  summary: string;
  title: string;
  type: string;
  [key: string]: any;
}

const VideoDetailsPage: React.FC<Props> = ({ course, plans, reviews }) => {
  const router = useRouter();
  const [hasVideo, setHasVideo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { ratings } = reviews || {};
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];
  const {
    title,
    thumbnail,
    description,
    contents,
    categories,
    level,
    id: courseId,
    paid,
    rating,
  } = course;
  const { user } = useSelector((state) => state?.user);
  const { plan: curPlan } = user?.currentSubscription || {};

  const coursePaidTxt =
    paid && !curPlan?.id
      ? 'Upgrade your account to premium to watch this video'
      : 'To begin this course, click the button below to watch videos';

  const isVideo = (type: string) => type.toLowerCase() === 'video';

  const takeCourse = (video: IContent) => {
    const { title, id, type } = video;
    if (isVideo(type)) {
      router.push(`/take-course/${courseId}/${title}?contId=${id}`);
    }
  };

  const onClickedUpgrade = () => {
    if ((paid && curPlan?.id) || !paid)
      return router.push(`/take-course/${courseId}/${title}`);
    else setIsOpen(true);
  };

  useEffect(() => {
    const hasVideo = contents.some((content: IContent) =>
      isVideo(content.type),
    );
    setHasVideo(hasVideo);
  }, []);

  const onClickSubCard = (stp: number) => {
    setStep(stp);
  };

  const onClose = () => {
    setIsOpen(false);
    setStep(0);
  };

  return (
    <>
      <Modal
        openModal={isOpen}
        onClose={onClose}
        modalClass={styles.modalClass}
        zIndex="99"
      >
        {
          <SubCard
            plans={plans}
            curPlan={curPlan}
            step={step}
            onClickSubCard={onClickSubCard}
          />
        }
      </Modal>
      <header className={styles.header}></header>
      <div className={`app-pad ${styles.jumbotron}`}>
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
        <div className={styles.details_sec}>
          <div
            className={`${styles.img_details} hand`}
            onClick={onClickedUpgrade}
          >
            <section>
              {thumbnail?.url && (
                <Image src={thumbnail?.url} layout="fill" alt="video_img" />
              )}
              <div
                className="overlay"
                style={{ background: !hasVideo ? '#fff' : '' }}
              >
                {!hasVideo ? (
                  <span>This course contains no video</span>
                ) : (
                  <>
                    {paid && !curPlan?.id ? (
                      <Button className={styles.si_btn} bg="#C03E21">
                        &nbsp;&nbsp;&nbsp;UPGRADE TO PRO
                        <Icon id="arrow-right" width={20} height={20} />
                        &nbsp;&nbsp;&nbsp;
                      </Button>
                    ) : (
                      <Button
                        className={styles.si_btn}
                        style={{ width: '60%' }}
                        bg="#C03E21"
                      >
                        &nbsp;&nbsp;&nbsp;Watch Video
                        <Icon id="arrow-right" width={20} height={20} />
                        &nbsp;&nbsp;&nbsp;
                      </Button>
                    )}
                  </>
                )}
              </div>
            </section>
          </div>

          <section className={styles.info_details}>
            <span className={styles.labeltag}>
              {categories.slice(0, 3).map((category, i) => (
                <LabelTag key={category} color={colors[i]}>
                  {category}
                </LabelTag>
              ))}
              {categories.length > 3 && <LabelTag>+3</LabelTag>}
            </span>
            <h2 className={`title ${styles.title}`}>{title}</h2>
            <div className={styles.starwrap}>
              <Ratings rating={Math.ceil(rating)} />
              <span style={{ color: '#7c7c7c' }}>{Math.ceil(rating)}</span>
            </div>
            <div className={`${level} ${styles.min_details}`}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
              &nbsp; Intermediate &nbsp;&nbsp;
              {false && <Icon id="clock_" width={20} height={20} />} &nbsp;
            </div>
          </section>
        </div>
      </div>
      <div className={styles.tabs}>
        {<span>About this course</span>}
        <span>Course content</span>
        <span>Ratings</span>
        <article className={styles.getstarted}>
          <h2 className="title">
            {paid && !curPlan?.id ? 'Upgrade plan' : 'Watch video'}
          </h2>

          <p className={styles.pp}>{coursePaidTxt}</p>
          <Button className={styles.si_btn} onClick={onClickedUpgrade}>
            {paid && !curPlan?.id ? 'Upgrade to pro' : 'Start watching video'}{' '}
            <Icon id="arrow-right" width={20} height={20} />
          </Button>
        </article>
      </div>
      <section className={styles.about}>
        <h2 className="title">About this course</h2>
        {false && (
          <p>
            In this class, Documentary Photographer and Photojournalist, KC
            Nwakalor breaks down the various compositional techniques you can
            apply in order to have a better outcome in your photographs.
          </p>
        )}
        <p>
          {description}
          {description.length > 600 && (
            <span
              style={{ color: '#C03E21', fontWeight: 'bold' }}
              className="hand"
            >
              {' '}
              Show more.
            </span>
          )}
        </p>
      </section>
      <section className={styles.content}>
        <h2 className="title">Course content</h2>
        <ul>
          {contents.map((content: IContent) => (
            <li
              key={content.id}
              className="hand"
              onClick={() => takeCourse(content)}
            >
              <div className={styles.f_sp}>
                <Icon
                  id={isVideo(content.type) ? 'play' : 'file'}
                  width={20}
                  height={20}
                />
                &nbsp;<span className="elips">{content.title}</span>
              </div>
              <span>
                {false && <Icon id="clock_" width={20} height={20} />} &nbsp;
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.ratings}>
        <h2 className="title" style={{ marginBottom: '20px' }}>
          Ratings
        </h2>
        {ratings.map((rating: any) => (
          <article className={styles.comment} key={rating.id}>
            <div className={styles.avatar}>
              {firstLetter(rating?.user?.firstName)}
              {firstLetter(rating?.user?.lastName)}
            </div>
            <div className={styles.comment_txt}>
              <div className={styles.sp}>
                <span>
                  {rating?.user?.firstName} {rating?.user?.lastName}
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;{formatDate(rating?.dateCreated)}
              </div>
              <div className="starwrap">
                <Ratings rating={rating.rating} />
                <span style={{ color: '#7c7c7c' }}>{rating.rating}</span>
              </div>
              <p>{rating.feedback}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default VideoDetailsPage;
