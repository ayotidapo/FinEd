import styles from './settings.module.scss';
import MyProfile from 'components/MyProfile';
import { useRouter } from 'next/router';
import SubscriptionPage, { IPlan } from 'components/SubscriptionPage';
import SideBar from 'components/SettingsSideBar';
import { useState } from 'react';
import ReferFriend from 'components/ReferFriend';
import ChangePassword from 'components/ChangePassword';

interface Props {
  plans: IPlan[];
}

const SettingsPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const query = router?.query || {};

  const tab = (query?.tab || 'profile') as string;

  const { plans } = props;

  // const getRefDetails = async () => {
  //   const data = await axios.get(`/referrals/user`);
  // };

  const onChangeTab = (tabname: string) => {
    router.push(`/settings?tab=${tabname}`);
  };

  // useEffect(() => {
  //   // getRefDetails();
  // }, []);

  return (
    <>
      <main className={styles.settings_main}>
        <section style={{ padding: '10px 0px' }}>
          <h2 className="title">My Settings</h2>
          <div className={styles.wrapper}>
            <SideBar onChangeTab={onChangeTab} tabname={tab} />
            <div className={styles.display}>
              {tab === 'profile' && <MyProfile />}
              {tab === 'subscriptions' && <SubscriptionPage plans={plans} />}
              {tab === 'refer' && <ReferFriend />}
              {tab === 'change-password' && <ChangePassword />}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SettingsPage;
