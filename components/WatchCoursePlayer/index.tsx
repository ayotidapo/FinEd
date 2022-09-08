import { BtnLoader } from 'common/Button';
import Icon from 'common/Icon';
import LabelTag from 'common/LabelTag';
// import { title } from 'process';
import { ICourse } from 'reducers/courses';
import styles from './watchcourse.module.scss';

interface Props {
  loading: boolean;
  hasVideo: boolean;
  cantWatch: boolean;
  course: ICourse;
  videoRef: any;
  url: string;
}
const CoursePlayer: React.FC<Props> = (props) => {
  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];
  const { loading, hasVideo, cantWatch, videoRef, url, course } = props;
  return (
    <>
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
                  ref={videoRef}
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
        <h2 className="title">{course?.title}</h2>
        <div className={styles.barz_clock}>
          <div className={`${course?.level} ${styles.min_details}`}>
            <span>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
              &nbsp;{course?.level}
            </span>
            {course?.duration && (
              <span>
                &nbsp;&nbsp;&nbsp;
                <Icon id="clock" width={20} height={20} />
                &nbsp;9 mins
              </span>
            )}
          </div>
          <div>
            {course?.categories?.slice(0, 3).map((cat, i) => (
              <LabelTag key={i} color={colors[i]}>
                {cat}
              </LabelTag>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '50px' }}>
          <p className={styles.summary}>Summary of this video</p>
          <span>{course?.description}</span>
        </div>
        {false && (
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
        )}
      </div>
    </>
  );
};

export default CoursePlayer;
