/* eslint-disable react-hooks/exhaustive-deps */
import Icon from 'common/Icon';
import Logo from 'common/Logo';
import styles from './mobileheader.module.scss';
import Button from 'common/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useSelector } from 'store';
import classnames from 'classnames';
import Modal from 'common/Modal';
import SubCard from 'common/SubCard';
import { useEffect, useState } from 'react';
import ProfileAvatar from 'common/Avatar';
import useSetNav from 'hooks/useSetNav';

interface Props {
  user: {
    [key: string]: any;
  };
  upgrade: () => void;
  setNav: (status?: boolean) => void;
  subId?: boolean;
  open?: boolean;
}

const MobileAuthHeader: React.FC<Props> = (props) => {
  const router = useRouter();

  const { user } = props;
  const path = router.pathname;

  const logOut = async () => {
    const nextApi = axios.create({
      baseURL: '/api',
    });

    await nextApi.post('/logout');
    router.replace('/login');
  };

  const onClickLink = (path?: any) => {
    props.setNav(false);
    if (path) router.push(path);
  };

  const onClickedUpgrade = () => {
    props.upgrade();
    props.setNav();
  };

  if (!props.open) return <></>;

  return (
    <header className={styles.mobAuthHeader}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.logo_box}>
          <Logo />
        </div>
        <span className={styles.hamburger} onClick={() => props.setNav()}>
          <Icon id="close-mobHeader" width={33} height={33} />
        </span>
      </div>
      <div className={styles.myacc}>
        <span className={styles.avatar}>
          <ProfileAvatar
            user={{
              avatar: user?.avatar,
              firstName: user?.firstName,
              lastName: user?.lastName,
            }}
          />
        </span>
        <span className={styles.sp}>My Account</span>
        {!props.subId && (
          <Button
            // className={classnames(styles.upgrade, { hide: subId })}
            onClick={onClickedUpgrade}
          >
            UPGRADE
          </Button>
        )}
      </div>

      <nav className={`navi ${styles.navi_box}`}>
        <strong>Learning</strong>
        <ul className={styles.nav_ul}>
          <li onClick={() => onClickLink('/courses')}>
            <a className={path.includes('course') ? styles.activelnk : ''}>
              <Icon id="camera" width={20} height={20} />
              &nbsp;Courses
            </a>
          </li>
          <li>
            <a
              onClick={() => onClickLink('/my-learning')}
              className={path.includes('learning') ? styles.activelnk : ''}
            >
              <Icon id="book" width={20} height={20} />
              &nbsp;My Learning
            </a>
          </li>
          <li>
            <a
              onClick={() => onClickLink('/my-learning?tab=bookmarked')}
              className={path.includes('contents') ? styles.activelnk : ''}
            >
              <Icon id="book-mark" />
              Bookmarks
            </a>
          </li>
        </ul>
      </nav>
      <nav className={`navi ${styles.navi_box}`}>
        <strong>Account</strong>
        <ul className={styles.nav_ul}>
          <li>
            <a
              onClick={() => onClickLink('/settings')}
              className={path.includes('course') ? styles.activelnk : ''}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Icon id="clog" width={20} height={20} />
                &nbsp;Settings <Icon id="caret-down" />
              </span>
            </a>

            <p className={styles.sublink}>
              <a onClick={() => onClickLink('/settings?tab=profile')}>
                <Icon id="user" width={20} height={20} />
                <span>&nbsp;My Profile</span>
              </a>
              <a onClick={() => onClickLink('/settings?tab=subscriptions')}>
                <Icon id="sub" width={20} height={20} />
                <span>&nbsp;My Subscription</span>
              </a>
              <a onClick={() => onClickLink('/settings?tab=refer')}>
                <Icon id="hamper" width={20} height={20} />{' '}
                <span>&nbsp;Refer a friend</span>
              </a>
              <a onClick={() => onClickLink('/settings?tab=change-password')}>
                <Icon id="padlock" width={20} height={20} />
                <span>&nbsp;Change Password</span>
              </a>
            </p>
          </li>
          {!props.subId && (
            <li onClick={props.upgrade}>
              <a className={path.includes('learning') ? styles.activelnk : ''}>
                <Icon id="upgrade" width={20} height={20} />
                &nbsp;Upgrade
              </a>
            </li>
          )}
        </ul>
      </nav>

      <div
        className={styles.sublink}
        style={{ color: '#637170', display: 'flex', alignItems: 'center' }}
        onClick={logOut}
      >
        <Icon id="logout" width={20} height={20} /> <span>&nbsp;Logout</span>
      </div>
    </header>
  );
};
export default MobileAuthHeader;
