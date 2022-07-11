import Header from 'common/HeaderLoggedIn';
import Image from 'next/Image';
import LabelTab from 'common/LabelTab';
import styles from './settings.module.scss';
import Button from 'common/Button';
import MyProfile from 'components/MyProfile';
import Subscriptions from 'components/Subscriptions'
import SideBar from 'components/SettingsSideBar';
import cx from 'classnames';
import Icon from 'common/Icon';
import { useState } from 'react';

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

						<section className={styles.display}>
							{false && <MyProfile />}
							<Subscriptions />
						</section>
					</div>
				</section >
			</main >
		</>
	);
};

export default SettingsPage;
