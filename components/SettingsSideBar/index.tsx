import Button from 'common/Button';
import Icon from 'common/Icon';
import Image from 'next/image';
import LabelTab from 'common/LabelTab';
import cx from 'classnames';
import styles from './settingssidebar.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Tooltip from 'common/Tooltip';
import { useSelector } from 'store';
import SocialMediaShare from 'common/SocialShare';

const tabs = [
  {
    tabname: 'profile',
    text: 'Profile',
    icon: 'user',
  },
  {
    tabname: 'subscriptions',
    text: 'Subscriptions',
    icon: 'sub',
  },
  {
    tabname: 'refer',
    text: 'Refer a friend',
    icon: 'hamper',
  },
  {
    tabname: 'change-password',
    text: 'Change Password',
    icon: 'padlock',
  },
];

interface Props {
  onChangeTab: (tab: string) => void;
  tabname: string;
}

const SideBar: React.FC<Props> = (props: Props) => {
  const { user } = useSelector((state) => state?.user);
  const refCode = user?.refCode;
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setEl(document.getElementById('codeSpan'));
  }, []);

  const router = useRouter();

  const logOut = async () => {
    const nextApi = axios.create({
      baseURL: '/api',
    });

    await nextApi.post('/logout');
    router.replace('/login');
  };

  return (
    <>
      <section className={styles.sidetab}>
        <nav className={styles.settings_nav}>
          <ul>
            {tabs.map((tab) => (
              <LabelTab
                tab={tab}
                key={tab.tabname}
                onClick={() => props.onChangeTab(tab.tabname)}
                className={cx({
                  [styles.activeTab]: props.tabname === tab.tabname,
                })}
              />
            ))}
            <LabelTab
              tab={{
                text: 'Log out',
                icon: 'logout',
              }}
              onClick={logOut}
            />
          </ul>
        </nav>
        {props.tabname !== 'Refer a friend' && (
          <div className={styles.refer_div}>
            <div className={styles.refer_box}>
              <Image alt="gift_box" src="/assets/gift_box.png" layout="fill" />
            </div>
            <span>Get 5% off when you refer a friend</span>
            <Tooltip el={el}>
              <Button className={styles.copy}>
                <span id="codeSpan">{refCode}</span>
                <Icon id="copy" />
              </Button>
            </Tooltip>
            {false && <SocialMediaShare iconSize={18} />}
          </div>
        )}
      </section>
    </>
  );
};
export default SideBar;
