import Header from 'common/HeaderLoggedIn';
import styles from './settings.module.scss';
import MyProfile from 'components/MyProfile';
import SubscriptionPage, { IPlan } from 'components/SubscriptionPage'
import SideBar from 'components/SettingsSideBar';
import { useState } from 'react';
import ReferFriend from 'components/ReferFriend';
import ChangePassword from 'components/ChangePassword';
import { toast } from 'react-toastify';

interface Props {
	plans: IPlan[]
}

const SettingsPage: React.FC<Props> = (props) => {
	const [activeTab, setActiveTab] = useState<string>('My Profile');
	const { plans } = props

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
							{activeTab === 'Subcriptions' && <SubscriptionPage plans={plans} />}
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
