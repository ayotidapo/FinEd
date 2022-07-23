import Header from 'common/HeaderLoggedIn';
import styles from './settings.module.scss';
import MyProfile from 'components/MyProfile';
import SubscriptionPage from 'components/SubscriptionPage'
import SideBar from 'components/SettingsSideBar';
import { useState } from 'react';
import ReferFriend from 'components/ReferFriend';
import ChangePassword from 'components/ChangePassword';

interface Props { }

const SettingsPage: React.FC<Props> = () => {
	const [activeTab, setActiveTab] = useState<string>('My Profile');
	return (
		<>
			<Header />
			<main className={styles.settings_main}>
				<section style={{ padding: '10px 0px' }}>
					<h2 className="title">My Settings</h2>
					<div className={styles.wrapper}>
						<SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

						<div className={styles.display}>
							{activeTab === 'My Profile' && <MyProfile />}
							{activeTab === 'Subcriptions' && <SubscriptionPage />}
							{activeTab === 'Refer a friend' && <ReferFriend />}
							{activeTab === 'Change password' && <ChangePassword />}

						</div>
					</div>
				</section >
			</main >
		</>
	);
};

export default SettingsPage;
