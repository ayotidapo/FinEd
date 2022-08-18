import Input from 'common/Input';
import Icon from 'common/Icon';
import Logo from 'common/Logo';
import Button from 'common/Button';
import styles from './headerwtsearch.module.scss';
import { useRouter } from 'next/router';

const HeaderWtSearch: React.FC = () => {
  const router = useRouter();
  const fields = {
    search: {
      name: 'search',
      value: '',
      label: '',
      type: 'text',
      placeholder: 'search',
      error: '',
    },
  };

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
            field={fields.search}
            leftIcon={{ name: 'search', pos: [35, 0] }}
            wrapperClass={styles.wrapClass}
            inputClass={styles.inptClass}
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
