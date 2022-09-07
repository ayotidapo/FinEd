/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import cx from 'classnames';
import Icon from 'common/Icon';
import { LabelCheck } from 'common/LabelTag';
import { useRouter } from 'next/router';
import Checkbox from 'common/Checkbox';
import VideoCard from 'common/VideoCard';
import styles from './videoslist.module.scss';
import Input from 'common/Input';
import { useSelector, useDispatch } from 'store';
import useForm from 'hooks/useForm';
import Link from 'next/link';
import Paginate from 'common/Paginate';
import PageLoader from 'common/PageLoader';
import EmptyView from 'common/EmptyView';

export interface ICourse {
  id: string;
  categories: string[];
  createdAt: string;
  description: string;
  level: string;
  paid: false;
  published: boolean;
  thumbnail: { id: string; url: string; key: string };
  title: string;
  updatedAt: string;
  explorePage?: boolean;
  [key: string]: any;
}

interface Props {
  [key: string]: any;
  courses: ICourse[];
  paginationUrl?: string;
}

const VideosListPage: React.FC<Props> = (props) => {
  const { user } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const { explorePage, courses, paginationUrl } = props;
  const coursesData = courses;
  const router = useRouter();
  const { page = '1', s } = router.query;

  const fields = {
    search: {
      name: 'search',
      value: s?.toString() || '',
      type: 'text',
      label: '',
      placeholder: 'Search',
      error: '',
      required: false,
    },
  };
  const { onChangeInput, inputs } = useForm(fields);
  const { search } = inputs;

  useEffect(() => {
    const handler = setTimeout(async () => {
      const searchQstr = search.value ? `&s=${search.value}` : '';

      router.push(`/${props.paginationUrl}/?page=${page}${searchQstr}`);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search.value]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoading(true);
    }
  }, []);

  const onChangePage = (e: { selected: number }) => {
    if (search.value) return;
    const { selected: pageNum } = e;
    const searchQstr = s ? `&s=${s}` : '';
    return router.push(
      `/${props.paginationUrl}/?page=${pageNum + 1}${searchQstr}`,
    );
  };

  return (
    <>
      <header className={styles.video_header_wrap}>
        <div className={styles.topics}>
          <h2 className="title">
            Let&apos;s start learning
            <span style={{ textTransform: 'capitalize' }}>
              {user?.firstName ? `, ${user?.firstName}` : ' !'}
            </span>
          </h2>
          <span
            className="d-flx"
            onClick={() => setShowFilter((state) => !state)}
          >
            <span className={`hand ${styles.xplore}`}>Filter Topics</span>
            <span className={`hand ${styles.cr_dn}`}>
              <Icon id="caret-down" width={24} height={24} />
            </span>
          </span>
          {!explorePage && (
            <div className={styles.search_input}>
              <Input
                field={search}
                leftIcon={{ name: 'search' }}
                wrapperClass={styles.wrapClass}
                inputClass={styles.inptClass}
                onChange={onChangeInput}
                autoFocus={search?.value}
              />
            </div>
          )}
          <span
            className={`hand ${styles.filter}`}
            onClick={() => setShowFilter((state) => !state)}
          >
            <Icon id="filter" width={24} height={24} />
          </span>

          <section
            className={cx([styles.filter_box], {
              [styles.filter_box_show]: showFilter,
            })}
          >
            <div className={styles.by_topics}>
              <p>Filter by Topics</p>
              <div className={styles.tags_div}>
                <LabelCheck
                  tag="MoneyAfrica"
                  value="MoneyAfrica"
                  type="checkbox"
                />
                <LabelCheck
                  tag="Blockchain"
                  value="Blockchain"
                  type="checkbox"
                />
                <LabelCheck tag="Ethereum" value="Ethereum" type="checkbox" />
                <LabelCheck
                  tag="Technical analysis"
                  value="Technical analysis"
                  type="checkbox"
                />
                <LabelCheck
                  tag="Cryptocurrency"
                  value="Cryptocurrency"
                  type="checkbox"
                />
                <LabelCheck
                  tag="Essentials"
                  value="Essentials"
                  type="checkbox"
                />
                <LabelCheck tag="Security" value="Security" type="checkbox" />
              </div>
            </div>

            <div className={styles.by_levels}>
              <p>Filter by Levels</p>
              <div className={styles.levels_div}>
                <span className="Beginner">
                  <Checkbox
                    name="beginner"
                    value=""
                    type="checkbox"
                    onChange={() => null}
                  />
                  &nbsp;&nbsp;
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  &nbsp;Beginner
                </span>
                <span className="Intermediate">
                  <Checkbox
                    name="intermediate"
                    value=""
                    type="checkbox"
                    onChange={() => null}
                  />
                  &nbsp;&nbsp;
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  &nbsp;Intermediate
                </span>
                <span className="Advanced">
                  <Checkbox
                    name="advanced"
                    value=""
                    type="checkbox"
                    onChange={() => null}
                  />
                  &nbsp;&nbsp;
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  &nbsp;Advanced
                </span>
              </div>
            </div>
          </section>
        </div>
      </header>

      <main>
        <div className={styles.content_wrap}>
          <section className={styles.content_tabs}>
            <span style={{ color: '#000' }}>
              {explorePage ? 'Explore our courses' : 'Courses'}
            </span>
            {/* <span>Videos (14)</span> */}
            <div className={styles.content_sort}>
              {/* <span style={{ color: '#7C7C7C' }}>Sort by &nbsp;&nbsp;</span>
              <span className={`hand`}>Latest videos</span> */}
              {false ? (
                <div className={styles.vw_all}>
                  <span className={`hand`}>
                    <Link href="/courses">View all</Link>
                  </span>
                  <span className={`hand ${styles.cr_dn}`}>
                    <Icon id="caret-right" width={18} height={18} />
                  </span>
                </div>
              ) : (
                false && (
                  <div className={`hand ${styles.sortby_div}`}>
                    <span style={{ color: '#747474' }}>Sort by </span>
                    <span> Latest videos</span>
                    <Icon id="caret-down" width={18} height={18} />
                  </div>
                )
              )}
            </div>
          </section>
          {loading && (
            <div className="container">
              <PageLoader />
            </div>
          )}
          {coursesData.length > 0 && !loading && (
            <>
              <section className={styles.content_items_wrap}>
                {coursesData?.map((course: ICourse) => (
                  <VideoCard key={course.id} course={course} />
                ))}
              </section>

              <Paginate
                totalCount={props.totalCount}
                pageUrl={paginationUrl}
                onChangePage={onChangePage}
              />
            </>
          )}
          {coursesData.length < 1 && <EmptyView contentName="course" />}
        </div>
      </main>
    </>
  );
};

export default VideosListPage;
//
