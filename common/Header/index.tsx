import Link from 'next/link';
import Button from 'common/Button';
import Logo from 'common/Logo';
import styles from './header.module.scss';
import { useRouter } from 'next/router';
import Icon from 'common/Icon';
import { useState } from 'react';

const Header: React.FC<any> = ({ setNav }) => {
  const router = useRouter();
  return (
    <header className={`app-pad ${styles.header}`}>
      <div className={styles.logo_box}>
        <Logo />
      </div>
      <span
        className={`${styles.bambg}`}
        data-svg-path="../../svgs/hamburger.svg"
        onClick={setNav}
      />
      <div className={styles.navWrapper}>
        <nav className={styles.header_nav}>
          <ul className={styles.header_ul}>
            <li className={styles.tent}>Services</li>
            <li className={styles.tent}>Tools</li>
            <li className={styles.tent}>Company</li>
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

export const MobileHeader: React.FC<any> = ({ toOpen, setNav }) => {
  const router = useRouter();

  const [open] = useState(toOpen);

  const ontoggle = () => {
    setNav(!open);
  };

  return (
    <>
      {open ? (
        <header className={styles.mobileHeader}>
          <div className="logo_div">
            <Logo />
          </div>
          <span className={`${styles.headerIcon}`} onClick={ontoggle} />
          <div className={styles.navWrapper}>
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
          </div>
          <div className={styles.header_btn_div}>
            <Button onClick={() => router.push('/signup')} bg="#c03e21">
              Get Started
            </Button>
            <Button>Financial Health Check</Button>
          </div>
        </header>
      ) : (
        <div style={{ display: 'none' }} />
      )}
    </>
  );
};
