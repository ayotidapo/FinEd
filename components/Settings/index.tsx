import Header from 'common/HeaderLoggedIn'
import Image from 'next/Image';
import LabelTab from 'common/LabelTab'
import styles from './settings.module.scss'
import Button from 'common/Button';
import fields from 'components/SignupPage/fields'
import Icon from 'common/Icon';
import Input from 'common/Input';
import Select from 'common/Select';
import { LabelCheck } from 'common/LabelTag';
interface Props {

}
const tabs = [
	{
		text: 'My Profile',
		icon: 'user'
	},
	{
		text: 'Subcriptions',
		icon: 'sub'
	},
	{
		text: 'Refer a friend',
		icon: 'hamper'
	}, {
		text: 'Change password',
		icon: 'padlock'
	},
	{
		text: 'Log out',
		icon: ''
	}]

const SettingsPage: React.FC<Props> = () => {
	return (
		<>
			<Header />
			<main className={styles.settings_main}>
				<section>
					<h2 className='title'>My Settings</h2>
					<div className={styles.wrapper}>
						<section className={styles.sidetab}>
							<nav className={styles.settings_nav}>
								<ul >
									{
										tabs.map(tab => <LabelTab tab={tab} key={tab.text} />)
									}

								</ul>
							</nav>
							<div className={styles.refer_div}>
								<div className={styles.refer_box}>
									<Image alt="gift_box" src="/assets/gift_box.png" layout="fill" />
								</div>
								<span>Get 10% off when you refer a friend</span>
								<Button className={styles.copy}>Thelma23 <Icon id="copy" /></Button>
								<div className='socials'>
									<Icon id="fb" width={18} height={18} />
									<Icon id="linkdIn" width={18} height={18} />
									<Icon id="whatsapp" width={18} height={18} />
									<Icon id="twitter" width={18} height={18} />
								</div>
							</div>

						</section>
						<section className={styles.display}>
							<form className={styles.profile_wrapper}>
								<div className={styles.profile_imgr}>
									<div className={styles.lft}>
										<h3>Profile Image</h3>
										<p>
											Choose a new avatar to be used across your MoneyAfrica account.
										</p>
									</div>
									<div className={`${styles.ryt}  ${styles.dx_al}`}>
										<span className={styles.avatar_wrapper}>
											<span className={`avatar ${styles.avatar}`}>
												<Image src="/assets/girl.png" layout='fill' alt='profile-picture' />
											</span>
										</span>
										<Icon className="hand" id="img-logo" style={{ margin: '0px 7px 0px 15px', color: '#015351' }} />
										<h4 className="hand" style={{ fontSize: '1.4rem', color: '#015351' }} >Edit Profile</h4>
									</div>

								</div>


								<div className={styles.personal_info}>
									<div className={styles.lft}>
										<h3>Personal Info</h3>
										<p>
											Make edits and updates to your name
										</p>
									</div>
									<div className={`flx-dir-col ${styles.ryt}`}>

										<div className='split'>
											<Input field={fields.firstName} leftIcon={{ name: 'user' }} />
											<Input field={fields.firstName} leftIcon={{ name: 'user' }} />
										</div>
										<Input field={fields.email} leftIcon={{ name: 'envelope' }} />
										<div className={styles.split_phone}>
											<Input
												field={fields.nigeriaPhone}
												leftIcon={{ name: 'phone' }}
												rightIcon={{ name: 'caret-down', pos: [28, 72] }}

											>
												<Icon
													id="nigeria"
													width={24}
													height={24}
													className={styles.nigeria}
												/>
											</Input>
											<Input field={fields.phone} inputClass={styles.phone}>
												<span className={styles.number}>+234</span>
											</Input>
										</div>
										<div className={styles.radio_div}>
											<LabelCheck tag='female' rname="gender" value="female" type="radio" />
											<LabelCheck tag='male' rname="gender" value="male" type="radio" />
										</div>
										<Input field={fields.firstName} leftIcon={{ name: 'dob' }} />



									</div>

								</div>
								<div className={styles.contact_info}>
									<div className={styles.lft}>
										<h3>Contact Info</h3>
										<p>
											Make edits and updates to your contact details
										</p>
										<p>
											To change your email, reach out to admin@moneyafrica.com
										</p>
									</div>
									<div className={`flx-dir-col ${styles.ryt}`}>
										<Select name="country" options={[{ label: 'Lagos', value: 'lagos' }, { label: 'Abuja', value: 'abuja' }]} />
										<Select name="state" options={[{ value: 'ajah', label: 'Ajah' }, { value: 'garki', label: 'Garki' }]} />
									</div>

								</div>
								<div className={styles.btn_con}>
									<Button>  Save changes
										<Icon id="arrow-right" width={20} height={20} /></Button>
								</div>
							</form>

						</section>
					</div>

				</section>

			</main >
		</>
	)
};

export default SettingsPage;
