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
import { useSelector } from 'store';
import useForm from 'hooks/useForm';
import Link from 'next/link';
import Paginate from 'common/Paginate';
import PageLoader from 'common/PageLoader';
import EmptyView from 'common/EmptyView';
import axios from 'axios';
import useIFMobile from 'hooks/useIFMobile';

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
  const isMobile = useIFMobile();
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { explorePage, courses, paginationUrl } = props;
  const coursesData = courses;
  const router = useRouter();
  const { page = '1', s } = router.query;
  const isCoursePage = router.pathname === '/courses';

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
      const filterQstr =
        filterValue.length > 0 ? `&category=${filterValue.join(',')}` : '';
      const levelsQstr = levels.length > 0 ? `&level=${levels.join(',')}` : '';

      router.push(
        `/${props.paginationUrl}/?page=1${searchQstr}${filterQstr}${levelsQstr}`,
      );
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [search.value, filterValue.length, levels.length]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`/categories`);

      setCategories(data);
    } catch {}
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoading(true);
    }
    getCategories();
  }, []);

  const onChangePage = (e: { selected: number }) => {
    if (search.value) return;
    const { selected: pageNum } = e;
    const searchQstr = s ? `&s=${s}` : '';
    return router.push(
      `/${props.paginationUrl}/?page=${pageNum + 1}${searchQstr}`,
    );
  };

  const onChooseFilter = (e: any) => {
    const { checked, name, value } = e.target;
    if (name === 'category') {
      let filters: string[] = [...filterValue];
      if (checked) {
        filters.push(value);
      } else {
        const re_f = filters.filter((f) => f !== value);
        filters = [...re_f];
      }
      setFilterValue(filters);
    } else {
      let level_s: string[] = [...levels];
      if (checked) {
        level_s.push(value);
      } else {
        const re_f = level_s.filter((f) => f !== value);
        level_s = [...re_f];
      }
      setLevels(level_s);
    }
  };

  const showSearch = (explorePage && isMobile) || isCoursePage;
  return (
    <>
      <header className={styles.video_header_wrap}>
        <div className={`${styles.topics}`}>
          <h2 className="title">
            Let&apos;s start learning
            <span style={{ textTransform: 'capitalize' }}>
              {user?.firstName ? `, ${user?.firstName}` : ' !'}
            </span>
          </h2>
          {!search.value && (
            <div
              className="hand"
              onClick={() => setShowFilter((state) => !state)}
              style={{
                height: '40px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <label className={`hand ${styles.xplore}`}>Filter Topics</label>
              <span className={`hand ${styles.cr_dn}`}>
                <Icon id="caret-down" width={24} height={24} />
              </span>
            </div>
          )}
          {showSearch && (
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
                {categories?.map((category: any, i: number) => (
                  <LabelCheck
                    key={i}
                    tag={category.category}
                    rname="category"
                    value={category.category}
                    type="checkbox"
                    onChange={onChooseFilter}
                  />
                ))}
              </div>
            </div>

            <div className={styles.by_levels}>
              <p>Filter by Levels</p>
              <div className={styles.levels_div}>
                <span className="Beginner">
                  <Checkbox
                    name="level"
                    value="beginner"
                    type="checkbox"
                    onChange={onChooseFilter}
                  />
                  &nbsp;&nbsp;
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  &nbsp;Beginner
                </span>
                <span className="Intermediate">
                  <Checkbox
                    name="level"
                    value="intermediate"
                    type="checkbox"
                    onChange={onChooseFilter}
                  />
                  &nbsp;&nbsp;
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  &nbsp;Intermediate
                </span>
                <span className="Advanced">
                  <Checkbox
                    name="level"
                    value="advanced"
                    type="checkbox"
                    onChange={onChooseFilter}
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
