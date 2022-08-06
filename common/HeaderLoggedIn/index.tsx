import Icon from 'common/Icon';
import Image from 'next/image';
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
import { useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { user } = useSelector((state) => state?.user?.user);
  const { plans } = useSelector((state) => state?.plans);

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
    <header className={`app-pad ${styles.header}`}>
      <Modal
        openModal={isOpen}
        onClose={onClose}
        modalClass={styles.modalClass}
        zIndex="99"
      >
        {
          <SubCard
            plans={plans}
            curPlan={curPlan}
            step={step}
            onClickSubCard={onClickSubCard}
          />
        }
      </Modal>
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
        <Button
          className={classnames(styles.upgrade, { hide: subId })}
          onClick={onClickedUpgrade}
        >
          UPGRADE
        </Button>
        <Icon id="book-mark" />
        <Icon id="bell" />
        <div
          className={`hand ${styles.log_auth}`}
          onClick={() => router.push('/settings')}
        >
          <span className={styles.avatar}>
            <Image src="/assets/girl.png" layout="fill" alt="top-sec-img" />
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
