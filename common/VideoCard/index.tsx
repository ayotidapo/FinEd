import Image from 'next/image';
import { useRouter } from 'next/router';
import Icon from 'common/Icon';
import { ICourse } from 'components/VideosListPage';
import { formatDate } from 'helpers';
import Star from 'common/Star';
import styles from './videocard.module.scss';
import { useDispatch, useSelector } from 'store';
import React, { useState } from 'react';
import { bookMarkCourse, unbookMarkCourse } from './function';
import classnames from 'classnames';
import { updateCourses } from 'reducers/courses';
import Modal from 'common/Modal';
import Link from 'next/link';

interface Props {
  course: ICourse;
  unBookMarkFunc?: (id: string) => void;
}

const VideoCard: React.FC<Props> = ({ course, unBookMarkFunc }) => {
  const { thumbnail, level, title, paid, categories, updatedAt, id, bookmark } =
    course;

  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const rating = Math.round(course?.rating);

  const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3'];
  const router = useRouter();
  const [bookMarked, setBookmarked] = useState(bookmark?.id);
  const [openModal, setOpenModal] = useState(false);

  const onBookMark = async (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    const { id } = course;

    if (!bookmark?.id) {
      setBookmarked(true);
      // console.log(bookmark, '0000');
      await bookMarkCourse(id);

      dispatch(updateCourses({ courseId: id, bookmark: { id: 'mockId' } }));
      return;
    }

    dispatch(updateCourses({ courseId: id, bookmark: {} }));

    if (unBookMarkFunc) unBookMarkFunc(id);
    await unbookMarkCourse(id);
    setBookmarked(false);
  };

  const onClickCard = () => {
    if (user?.id) return router.push(`/video/${id}/${title}`);
    setOpenModal(true);
  };

  return (
    <>
      <Modal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        modalClass={styles.modalClass}
        isBodyClose
      >
        <p className={styles.to_enjoy_course}>
          <Link href="/login">
            <a>Log in</a>
          </Link>{' '}
          or{' '}
          <Link href="/signup">
            <a>sign up</a>
          </Link>{' '}
          to begin to enjoy this course and other great courses on the platform.
        </p>
      </Modal>
      <article className={`${styles.video_card}`}>
        <div className={`hand ${styles.video_thumbnail}`} onClick={onClickCard}>
          {thumbnail?.url && (
            <Image src={thumbnail?.url} layout="fill" alt="top-sec-img" />
          )}
          <div className={styles.overlay}>
            <p onClick={(e) => onBookMark(e)} className={styles.bookmark}>
              {user?.id && (
                <span
                  className={classnames({ [styles.bookmarked]: bookMarked })}
                >
                  <Icon id="bookmark" width={24} height={24} className="hand" />
                </span>
              )}
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
            {false && (
              <span>
                &nbsp;&nbsp;&nbsp;
                <Icon id="clock" width={20} height={20} />
                &nbsp;9 mins
              </span>
            )}
            <span>
              &nbsp;&nbsp;&nbsp;
              <Icon id="file" width={20} height={20} />
              &nbsp;{course?.contents?.length || 0} content(s)
            </span>
            {false && (
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Icon id="see" width={20} height={20} />
                &nbsp;2,456
              </span>
            )}
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

            {false && (
              <Icon
                id="ellipsisY"
                width={20}
                height={20}
                className={styles.elipsis_y}
              />
            )}
          </p>
        </div>
      </article>
    </>
  );
};

export default VideoCard;
