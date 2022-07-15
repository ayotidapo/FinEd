
import Image from 'next/image';
import { useRouter } from 'next/router';
import Icon from 'common/Icon';
import { ICourse } from 'components/VideosListPage'
import Star from 'common/Ratings';
import styles from './videocard.module.scss';


interface Props {
  course: ICourse
}


const VideoCard: React.FC<Props> = ({ course }) => {
  const { thumbnail, level, title, paid, contents, categories, id } = course
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3']
  const router = useRouter();


  return (
    <article className={`${styles.video_card}`} >
      <div className={`hand ${styles.video_thumbnail}`}
        onClick={() => router.push(`/video/${id}/${title}`)}
      >
        <Image src={thumbnail?.url} layout="fill" alt="top-sec-img" />
        <div className={styles.overlay}>
          <p>
            <Icon id="bookmark" width={24} height={24} className="hand" />
          </p>
          {false && <p>
            <Icon id="play" width={24} height={24} className="hand" />
          </p>}
          {paid &&
            <p>
              <Icon id="padlock" width={24} height={24} />
              &nbsp;
              <span style={{ paddingTop: '4px' }}>
                `Available for premium users only`
              </span>
            </p>
          }
        </div>
      </div>
      <div className={styles.video_info}>
        <p className="title">{title}</p>
        <div className={styles.rating_div}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} />
          ))}{' '}
          &nbsp;4.3
          <span style={{ color: '#7C7C7C' }}>
            &nbsp;&nbsp;&nbsp;Updated Aug 9, 2021
          </span>
        </div>
        <div className={`${level} ${styles.min_details}`}>
          <span>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
            &nbsp;{level}
          </span>
          <span>
            &nbsp;&nbsp;&nbsp;
            <Icon id="clock" width={20} height={20} />
            &nbsp;9 mins
          </span>
          <span>
            &nbsp;&nbsp;&nbsp;
            <Icon id="file" width={20} height={20} />
            &nbsp;{contents?.length || 0} content(s)
          </span>
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Icon id="see" width={20} height={20} />
            &nbsp;2,456
          </span>
        </div>
        <p className={styles.content_labels}>
          {
            categories.slice(0, 3).map((category: string, i) =>
              <label className="btn" style={{ background: `${colors[i]}` }} key={i}>
                {category}
              </label>
            )
          }

          <Icon
            id="ellipsisY"
            width={20}
            height={20}
            className={styles.elipsis_y}

          />
        </p>
      </div>
    </article>
  );
};

export default VideoCard;
