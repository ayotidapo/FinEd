import Header from 'common/HeaderLoggedIn';
import Image from 'next/Image';
import LabelTab from 'common/LabelTab';
import styles from './settings.module.scss';
import Button from 'common/Button';
import MyProfile from 'components/MyProfile';
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
				<section>
					<h2 className="title">My Settings</h2>
					<div className={styles.wrapper}>
						<SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

						<section className={styles.display}>
							{false && <MyProfile />}
							<section className={styles.subscriptions}>
								<div className={styles.left}>
									<h3> Choose your preffered plan</h3>
									<p>
										Select a plan to procees and have access to all the video
										and article courses on our platform.
									</p>
								</div>
								<div className={styles.right}>
									<article>
										<p className={styles.rec}>Recomended</p>
										<div className={styles.sub_card}>
											<div className={`flx_ac ${styles.img_dx}`}>
												<div className={styles.img_bx}>
													<span>
														<Image src='/assets/graph.png' alt="graph" layout='fill' />
													</span>

												</div>
												<div className='flx_jc_ac_cl'>
													<span className={styles.amt}>#10,000</span>
													<span>/6 months</span>
												</div>
											</div>
											<p className={styles.p}>
												<Icon id='light-cicle-mark' />&nbsp;
												Autorenews every 6 months.
											</p>
											<p className={styles.p}>
												<Icon id='light-cicle-mark' />&nbsp;
												Access to everything - video &amp; article courses.
											</p>
											<Button>
												Subscribe to this plan
												<Icon id="arrow-right" width={20} height={20} />
											</Button>
										</div>
									</article>
									<article>
										<p className={styles.rec} style={{ background: 'transparent' }}></p>
										<div className={styles.sub_card}>
											<div className={`flx_ac ${styles.img_dx}`}>
												<div className={styles.img_bx}>
													<span>
														<Image src='/assets/card.png' alt="card" layout='fill' />
													</span>

												</div>
												<div className='flx_jc_ac_cl'>
													<span className={styles.amt}>#10,000</span>
													<span>/6 months</span>
												</div>
											</div>
											<p className={styles.p}>
												<Icon id='light-cicle-mark' />&nbsp;
												Autorenews every 6 months.
											</p>
											<p className={styles.p}>
												<Icon id='light-cicle-mark' />&nbsp;
												Access to everything - video &amp; article courses.
											</p>
											<Button >
												Subscribe to this plan
												<Icon id="arrow-right" width={20} height={20} />
											</Button>
										</div>
									</article>
									<article>
										<div className={styles.sub_card}>
											<div className={`flx_ac ${styles.img_dx}`}>
												<div className={styles.img_bx}>
													<span>
														<Image src='/assets/chrome.png' alt="chrome" layout='fill' />
													</span>

												</div>
												<div className='flx_jc_ac_cl'>
													<span className={styles.amt}>#10,000</span>
													<span>/6 months</span>
												</div>
											</div>
											<p className={styles.p}>
												<Icon id='light-cicle-mark' />&nbsp;
												Autorenews every 6 months.
											</p>
											<p className={styles.p}>
												<Icon id='light-cicle-mark' />&nbsp;
												Access to everything - video &amp; article courses.
											</p>
											<Button>
												Subscribe to this plan
												<Icon id="arrow-right" width={20} height={20} />
											</Button>
										</div>
									</article>

								</div>

							</section>
						</section>
					</div>
				</section >
			</main >
		</>
	);
};

export default SettingsPage;
