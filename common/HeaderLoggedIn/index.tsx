import { useState } from 'react';
import Icon from 'common/Icon';
import Logo from 'common/Logo';
import styles from './headerloggedIn.module.scss';
import Button from 'common/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useSelector } from 'store';
import classnames from 'classnames';
import Modal from 'common/Modal';
import SubCard from 'common/SubCard';
import MobileHeader from './MobileAuthHeader';
import useSetNav from 'hooks/useSetNav';
import ProfileAvatar from 'common/Avatar';

const Header: React.FC<{ style?: { [key: string]: string } }> = ({ style }) => {
  const router = useRouter();
  const { open, onSetNav } = useSetNav();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { user } = useSelector((state) => state?.user);
  const { plans } = useSelector((state) => state?.plans);

  const path = router.pathname;
  const { id: subId, plan: curPlan } = user?.currentSubscription || {};

  const logOut = async () => {
    const nextApi = axios.create({
      baseURL: '/api',
    });

    await nextApi.post('/logout');
    router.replace('/login');
  };

  const onClose = () => {
    setIsOpen(false);
    setStep(0);
  };

  const onClickSubCard = (stp: number) => {
    setStep(stp);
  };

  const onClickedUpgrade = () => {
    setIsOpen(true);
  };

  return (
    <header className={`app-pad ${styles.header}`} style={style}>
      <Modal
        openModal={isOpen}
        onClose={onClose}
        modalClass={styles.modalClass}
        zIndex="99"
      >
        {
          <div className={styles.subCardsWrapper}>
            <SubCard
              plans={plans}
              curPlan={curPlan}
              step={step}
              onClickSubCard={onClickSubCard}
            />
          </div>
        }
      </Modal>

      {open && (
        <MobileHeader
          user={user}
          upgrade={onClickedUpgrade}
          subId={subId}
          setNav={onSetNav}
          open={open}
        />
      )}
      <div className={styles.logo_box}>
        <Logo />
      </div>
      <span className={styles.hamburger} onClick={() => onSetNav()}>
        <Icon id="hamburger" width={24} height={24} />
      </span>
      <nav className={`navi ${styles.navi_box}`}>
        <ul className={styles.nav_ul}>
          {false && (
            <li>
              <Link href="/contents">
                <a
                  className={path.includes('contents') ? styles.activelnk : ''}
                >
                  Explore
                </a>
              </Link>
            </li>
          )}
          <li>
            <Link href="/">
              <a className={path.includes('course') ? styles.activelnk : ''}>
                Courses
              </a>
            </Link>
          </li>
          {false && <li>Calculator</li>}
          <li>
            <Link href="/my-learning">
              <a className={path.includes('learning') ? styles.activelnk : ''}>
                My Learning
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.avatar_div}>
        <Button
          className={classnames(styles.upgrade, { hide: subId })}
          onClick={onClickedUpgrade}
        >
          UPGRADE
        </Button>
        <Link href="/my-learning?tab=bookmarked">
          <a>
            <Icon id="book-mark" />
          </a>
        </Link>
        {false && <Icon id="bell" />}
        <div className={`hand ${styles.log_auth}`}>
          <span className={styles.avatar}>
            <ProfileAvatar
              isDisabled
              user={{
                avatar: user?.avatar,
                firstName: user?.firstName,
                lastName: user?.lastName,
              }}
            />
          </span>
          <Icon id="caret-down" />
          <nav className={styles.setlog}>
            <ul className={`navi ${styles.tooltip_nav}`}>
              <Link href="/settings">
                <a>
                  <li>
                    <Icon id="clog" />
                    &nbsp; My Settings
                  </li>
                </a>
              </Link>

              <li onClick={logOut}>
                <Icon id="logout" />
                &nbsp; Logout
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
