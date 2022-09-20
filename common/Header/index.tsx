import Link from 'next/link';
import Button from 'common/Button';
import Logo from 'common/Logo';
import styles from './header.module.scss';
import { useRouter } from 'next/router';
import Icon from 'common/Icon';

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className={`app-pad ${styles.header}`}>
      <div className={styles.logo_box}>
        <Logo />
      </div>
      <nav className={styles.header_nav}>
        <ul className={styles.header_ul}>
          <li>Services</li>
          <li>Tools</li>
          <li>Company</li>
          <li>
            <Link href="/contents">Explore</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.header_btn_div}>
        <Button onClick={() => router.push('/signup')}>Get Started</Button>
        <Button>Financial Health Check</Button>
      </div>
      {false && (
        <span className={styles.hamburger}>
          <Icon id="hamburger" width={24} height={24} />
        </span>
      )}
    </header>
  );
};

export default Header;
