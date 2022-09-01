/* eslint-disable react-hooks/exhaustive-deps */
import Input, { IField } from 'common/Input';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import Icon from 'common/Icon';
import Logo from 'common/Logo';
import Button from 'common/Button';
import styles from './headerwtsearch.module.scss';

interface IProps {
  search: IField;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}
const HeaderWtSearch: React.FC<IProps> = ({ search, onChangeInput }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { page = '1', s } = router.query;

  useEffect(() => {
    const handler = setTimeout(async () => {
      const searchQ = search.value || s;
      const searchQstr = searchQ ? `&s=${search.value}` : '';

      router.push(`/contents/?page=${page}${searchQstr}`);
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

  return (
    <>
      <div className={`app-pad ${styles.header_sec}`}>
        <span className={styles.hamburger}>
          <Icon id="search" width={24} height={24} />
        </span>
        <div>
          <div className={styles.logo_box}>
            <Logo />
          </div>
          &nbsp;&nbsp;&nbsp;
          <span className={`hand activelnk ${styles.xplore}`}>Explore</span>
          {false && (
            <span className={`hand ${styles.cr_dn}`}>
              <Icon id="caret-down" width={24} height={24} />
            </span>
          )}
        </div>
        <div className={styles.right}>
          <Input
            field={search}
            leftIcon={{ name: 'search', pos: [35, 0] }}
            wrapperClass={styles.wrapClass}
            inputClass={styles.inptClass}
            onChange={onChangeInput}
          />

          <Button
            className={styles.logIn}
            onClick={() => router.push('/login')}
          >
            Log In
          </Button>
          <Button className={styles.btn} onClick={() => router.push('/signup')}>
            Get Started
          </Button>
        </div>
        <span className={styles.hamburger}>
          <Icon id="hamburger" width={24} height={24} />
        </span>
      </div>

      {/* <Star /> */}
    </>
  );
};

export default HeaderWtSearch;
