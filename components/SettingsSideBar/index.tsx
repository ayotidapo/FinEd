import Button from 'common/Button';
import Icon from 'common/Icon';
import Image from 'next/image';
import LabelTab from 'common/LabelTab';
import cx from 'classnames';
import styles from './settingssidebar.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Tooltip from 'common/Tooltip';
import { useSelector } from 'store';

const tabs = [
  {
    text: 'My Profile',
    icon: 'user',
  },
  {
    text: 'Subcriptions',
    icon: 'sub',
  },
  {
    text: 'Refer a friend',
    icon: 'hamper',
  },
  {
    text: 'Change password',
    icon: 'padlock',
  }
];

interface Props {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const SideBar: React.FC<Props> = (props: Props) => {
  
  const { user } = useSelector(state => state?.user?.user)
  const {refCode} = user
  const [el,setEl]=useState<HTMLElement | null>(null);

	useEffect(()=>{
		setEl(document.getElementById('codeSpan'))
		
	},[])

  const { setActiveTab, activeTab } = props;
  const router = useRouter()

  const onSetTab = (text: string) => {
    if (text === 'Log out') return;
    setActiveTab(text)
  }
  const logOut = async () => {
    const nextApi = axios.create({
      baseURL: '/api'
    })

    await nextApi.post('/logout');
    router.replace('/login')
  }
  
 
  return (
    <>
      <section className={styles.sidetab}>
        <nav className={styles.settings_nav}>
          <ul>
            {tabs.map((tab) => (
              <LabelTab
                tab={tab}
                key={tab.text}
                onClick={() => onSetTab(tab.text)}
                className={cx({ [styles.activeTab]: activeTab === tab.text })}
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
        {activeTab !== 'Refer a friend' &&
          (<div className={styles.refer_div}>
            <div className={styles.refer_box}>
              <Image alt="gift_box" src="/assets/gift_box.png" layout="fill" />
            </div>
            <span>Get 10% off when you refer a friend</span>
            <Tooltip el={el}>
              <Button className={styles.copy}>
                <span id='codeSpan'>{refCode}</span><Icon id="copy" />
              </Button>
            </Tooltip>
            <div className="socials">
              <Icon id="fb" width={18} height={18} />
              <Icon id="linkdIn" width={18} height={18} />
              <Icon id="whatsapp" width={18} height={18} />
              <Icon id="twitter" width={18} height={18} />
            </div>
          </div>)
        }
      </section>
    </>
  );
};
export default SideBar;
