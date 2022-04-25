import Image from 'next/image'
import Link from 'next/link'
import Button from 'pages/components/Button'
import Icon from 'pages/components/Icon'
import Input from 'pages/components/Input'
import styles from './reset.module.scss'

const ResetPasswordPage = () => {
	return (
		<main className={styles.resetPw}>
			<section className={styles.wrapper}>
				<div className={styles.topSection}>
					<div className={styles.logodiv}>
						<Image src="/assets/logo.png" layout="fill" alt="logo" />
					</div>
					<h2>Reset password</h2>
					<p>Enter your new password for your account.</p>
				</div>
				<form style={{ marginTop: '20px' }}>
					<Input type="password" label="New Password" leftIcon={{ name: 'padlock', pos: [0, 28] }} required={true}
						rightIcon={{ name: 'lock-password', pos: ['95%', 28] }}
					/>
					<Input type="password" label="Confirm New Password" leftIcon={{ name: 'padlock', pos: [0, 28] }}
						rightIcon={{ name: 'lock-password', pos: ['95%', 28] }}
					/>
				</form>
				<div className={styles.sign_up}>

					<Button>Reset password <Icon id="arrow-right" width={20} height={20} /></Button>
				</div>
			</section>


		</main >
	)
}

export default ResetPasswordPage