import Icon from 'common/Icon';
import { IContent } from 'components/VideoDetails';
import { toTimeString } from 'helpers';
import cx from 'classnames';
import styles from './tabvideos.module.scss';
import { ICourse } from 'components/VideosListPage';

interface Props {
  videos: any;
  duration: number;
  curVidId: string;
  onClickTab: (id: string) => void;
}

const TabCourseVideos: React.FC<Props> = (props) => {
  const { videos, duration, curVidId, onClickTab } = props;
  return (
    <>
      <p className="hand">Course content</p>

      <div className={styles.content}>
        <ul>
          {videos?.map((video: IContent, i: number) => (
            <li
              key={video.id}
              className={cx('hand', {
                [styles.active_vid]: video.id === curVidId,
              })}
              onClick={() => onClickTab(video.id)}
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
    </>
  );
};

export default TabCourseVideos;
