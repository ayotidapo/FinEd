import Image from 'next/image';
import { useRouter } from 'next/router';
import Icon from 'common/Icon';
import { ICourse } from 'components/VideosListPage';
import { formatDate } from 'helpers';
import Star from 'common/Ratings';
import styles from './videocard.module.scss';
import { useDispatch } from 'store';
import React, { useState } from 'react';
import { bookMarkCourse, unbookMarkCourse } from './function';
import classnames from 'classnames';
import { updateCourses } from 'reducers/courses';

interface Props {
  course: ICourse;
}

const VideoCard: React.FC<Props> = ({ course }) => {
  const { thumbnail, level, title, paid, categories, updatedAt, id, bookmark } =
    course;

  // const { user } = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const rating = Math.round(course?.rating);

  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];
  const router = useRouter();
  const [bookMarked, setBookmarked] = useState(bookmark?.id);

  // const canWatch = (paid && curPlan?.id) || !paid;
  const i = !paid ? 'Free' : 'Available for premium users only';
  const onBookMark = async (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    const { id } = course;
    if (!bookmark?.id) {
      setBookmarked(true);

      const response = await bookMarkCourse(id);

      return dispatch(
        updateCourses({ courseId: id, bookmark: { id: 'mockId' } }),
      );
    }

    dispatch(updateCourses({ courseId: id, bookmark: {} }));
    await unbookMarkCourse(id);
    setBookmarked(false);
  };
  console.log(course);
  return (
    <article className={`${styles.video_card}`}>
      <div
        className={`hand ${styles.video_thumbnail}`}
        onClick={() => router.push(`/video/${id}/${title}`)}
      >
        {thumbnail?.url && (
          <Image src={thumbnail?.url} layout="fill" alt="top-sec-img" />
        )}
        <div className={styles.overlay}>
          <p onClick={(e) => onBookMark(e)} className={styles.bookmark}>
            <span className={classnames({ [styles.bookmarked]: bookMarked })}>
              <Icon id="bookmark" width={24} height={24} className="hand" />
            </span>
          </p>
          {true && (
            <p style={{ visibility: 'hidden' }}>
              <Icon id="play" width={24} height={24} className="hand" />
            </p>
          )}

          <p>
            <Icon id={paid ? 'padlock' : 'pad-open'} width={24} height={24} />
            &nbsp;
            <span style={{ paddingTop: '4px' }}>
              {!paid ? 'Free' : 'Available for premium users only'}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.video_info}>
        <p className="title">{title}</p>
        <div className={styles.rating_div}>
          {[1, 2, 3, 4, 5].map((n, i) => (
            <Star key={n} id={i} rating={rating} />
          ))}
          &nbsp;{rating > 0 && rating}
          <span style={{ color: '#7C7C7C' }}>
            &nbsp;&nbsp;&nbsp;Updated {formatDate(updatedAt)}
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
            &nbsp;{course?.contents?.length || 0} content(s)
          </span>
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Icon id="see" width={20} height={20} />
            &nbsp;2,456
          </span>
        </div>
        <p className={styles.content_labels}>
          {categories.slice(0, 3).map((category: string, i) => (
            <label
              className="btn"
              style={{ background: `${colors[i]}` }}
              key={i}
            >
              {category}
            </label>
          ))}

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
