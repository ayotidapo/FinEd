import Button from 'common/Button';
import { useRouter } from 'next/router';
import Header from 'common/HeaderLoggedIn';
import Icon from 'common/Icon';
import LabelTag from 'common/LabelTag';
import Star from 'common/Ratings';
import Image from 'next/image';
import styles from './videodetails.module.scss';
import { ICourse } from 'components/VideosListPage';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  course: ICourse
}

export interface IContent {
  duration: 0;
  id: string;
  summary: string;
  title: string;
  type: string;
  [key: string]: any
}


const VideoDetailsPage: React.FC<Props> = ({ course }) => {
  const router = useRouter()
  const [hasVideo,setHasVideo]=useState(false)
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3']
  const { title, thumbnail, description, contents, categories, level, id: courseId,paid} = course
  const coursePaidTxt=paid ? 'Upgrade your account to premium to watch this video':'To begin this course, click the button below to watch videos'
  const isVideo = (type: string) => type.toLowerCase() === 'video'


  const takeCourse = (video: IContent) => {
    const { title, id, type } = video
    if (isVideo(type)) {
      router.push(`/take-course/${courseId}/${title}?contId=${id}`)
    }

  }
  
  const onClicked=()=>{
   return router.push(`/take-course/${courseId}/${title}`)
  }
  

  useEffect(()=>{

    const hasVideo = contents.some((content:IContent)=> isVideo(content.type))
    setHasVideo(hasVideo)

  },[])
  return (
    <>
      <header className={styles.header}>
        <Header />
      </header>
      <div className={`app-pad ${styles.jumbotron}`}>
        <nav className={styles.breadcrumb}>
          <ul>
            <li style={{ marginTop: '-2px' }} onClick={() => router.push('/')}>
              <Icon
                id="home"
                height={24}
                width={24}
                className="hand"

              />
              <Icon
                id="caret-right"
                height={15}
                width={15}
                style={{ margin: '0 10px' }}
              />
            </li>
            <li>
              <span
                className="hand"
                onClick={() => router.push('/contents/videos')}
              >
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
          <Link href={hasVideo ? `/take-course/${courseId}` : "#"}>
            <a className={styles.img_details}>
              <section>
                <Image src={thumbnail?.url} layout="fill" alt="video_img" />
                <div className="overlay" style={{ background : !hasVideo ? '#fff' : ''}}>
                  {!hasVideo && <span>This course contains no video</span>}
                  </div>
              </section>
            </a>
          </Link>

          <section className={styles.info_details}>
            <span className={styles.labeltag}>
              {categories.map((category, i) => <LabelTag key={category} color={colors[i]}>{category}</LabelTag>)}
              {categories.length > 3 && <LabelTag>+3</LabelTag>}
            </span>
            <h2 className={`title ${styles.title}`}>
              {title}
            </h2>
            <div className={styles.starwrap}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              <span>4.3</span>
            </div>
            <div className={`${level} ${styles.min_details}`}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
              &nbsp; Intermediate &nbsp;&nbsp;
              <Icon id="clock" width={20} height={20} /> &nbsp;15mins
            </div>
          </section>
        </div>
      </div>
      <div className={styles.tabs}>
        {<span>About this course</span>}
        <span>Course content</span>
        <span>Ratings</span>
        <article className={styles.getstarted}>
          <h2 className="title">{paid  && hasVideo ? 'Upgrade plan':'Watch video'}</h2>

          <p className={styles.pp}>
          {coursePaidTxt}
          </p>
          <Button
            className={styles.si_btn}
            onClick={onClicked}
          >
            {paid?'Start watching video': 'Upgrade to pro'} <Icon id="arrow-right" width={20} height={20} />
          </Button>
        </article>
      </div>
      <section className={styles.about}>
        <h2 className="title">About this course</h2>
        {false && <p>
          In this class, Documentary Photographer and Photojournalist, KC
          Nwakalor breaks down the various compositional techniques you can
          apply in order to have a better outcome in your photographs.
        </p>}
        <p>
          {description}
          {description.length > 600 &&
            <span
              style={{ color: '#C03E21', fontWeight: 'bold' }}
              className="hand"
            >
              {' '}
              Show more.
            </span>}
        </p>
      </section>
      <section className={styles.content}>
        <h2 className="title">Course content</h2>
        <ul>
          {contents.map((content: IContent) =>
            <li key={content.id} className='hand' onClick={() => takeCourse(content)}>
              <div className={styles.f_sp}>
                <Icon id={isVideo(content.type) ? "play" : 'file'} width={20} height={20} />
                &nbsp;<span className='elips'>{content.title}</span>
              </div>
              <span>
                <Icon id="clock" width={20} height={20} /> &nbsp;15mins
              </span>
            </li>
          )}
        </ul>
      </section>
      <section className={styles.ratings}>
        <h2 className="title" style={{ marginBottom: '20px' }}>
          Ratings
        </h2>
        <article className={styles.comment}>
          <div className={styles.avatar}>MA</div>
          <div className={styles.comment_txt}>
            <div className={styles.sp}>
              <span>Moronke Aniolaola</span>&nbsp;&nbsp;&nbsp;&nbsp;Aug 24,2021
            </div>
            <div className="starwrap">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              <span style={{ color: '#7c7c7c' }}>4.3</span>
            </div>
            <p>
              So far so good, first day of use was impressive, but the plastic
              bucket is too light weight can break easily if handled by
              children. But overall.... Good but time will tell.
            </p>
          </div>
        </article>
        <article className={styles.comment}>
          <div className={styles.avatar}>MA</div>
          <div className={styles.comment_txt}>
            <div className={styles.sp}>
              <span>Moronke Aniolaola</span>&nbsp;&nbsp;&nbsp;&nbsp;Aug 24,2021
            </div>
            <div className="starwrap">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              <span style={{ color: '#7c7c7c' }}>4.3</span>
            </div>
            <p>
              So far so good, first day of use was impressive, but the plastic
              bucket is too light weight can break easily if handled by
              children. But overall.... Good but time will tell.
            </p>
          </div>
        </article>
        <article className={styles.comment}>
          <div className={styles.avatar}>MA</div>
          <div className={styles.comment_txt}>
            <div className={styles.sp}>
              <span>Moronke Aniolaola</span>&nbsp;&nbsp;&nbsp;&nbsp;Aug 24,2021
            </div>
            <div className="starwrap">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              <span style={{ color: '#7c7c7c' }}>4.3</span>
            </div>
            <p>
              So far so good, first day of use was impressive, but the plastic
              bucket is too light weight can break easily if handled by
              children. But overall.... Good but time will tell.
            </p>
          </div>
        </article>
        <article className={styles.comment}>
          <div className={styles.avatar}>MA</div>
          <div className={styles.comment_txt}>
            <div className={styles.sp}>
              <span>Moronke Aniolaola</span>&nbsp;&nbsp;&nbsp;&nbsp;Aug 24,2021
            </div>
            <div className="starwrap">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              <span style={{ color: '#7c7c7c' }}>4.3</span>
            </div>
            <p>
              So far so good, first day of use was impressive, but the plastic
              bucket is too light weight can break easily if handled by
              children. But overall.... Good but time will tell.
            </p>
          </div>
        </article>
      </section>
    </>
  );
};

export default VideoDetailsPage;
