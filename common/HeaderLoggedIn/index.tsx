import Icon from 'common/Icon';
import Image from 'next/image';
import Logo from 'common/Logo';
import styles from './headerloggedIn.module.scss';
import Button from 'common/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const Header = () => {
  const router = useRouter()

  const logOut = async () => {
    const nextApi = axios.create({
      baseURL: '/api'
    })

    await nextApi.post('/logout');
    router.replace('/login')
  }

  return (
    <header className={`app-pad ${styles.header}`}>
      <div className={styles.logo_box}>
        <Logo />
      </div>
      <nav className={`navi ${styles.navi_box}`}>
        <ul className={styles.nav_ul}>
          <li>Explore</li>
          <li>Courses</li>
          <li>Calculator</li>
          <li>My Learning</li>
        </ul>
      </nav>
      <div className={styles.avatar_div}>
        <Button className={styles.upgrade}>UPGRADE</Button>
        <Icon id="book-mark" />
        <Icon id="bell" />
        <div className={`hand ${styles.log_auth}`} onClick={() => router.push('/settings')}>
          <span className={styles.avatar}>
            <Image src="/assets/girl.png" layout="fill" alt="top-sec-img" />
          </span>
          <Icon id="caret-down" />
          <nav className='navi'>
            <ul className={styles.tooltip_nav}>
              <Link href='/settings'>
                <a>
                  <li>
                    < Icon id="clog" />&nbsp; My Settings
                  </li>
                </a>
              </Link>


              <li onClick={logOut}>
                < Icon id="logout" />&nbsp; Logout
              </li>


            </ul>

          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
