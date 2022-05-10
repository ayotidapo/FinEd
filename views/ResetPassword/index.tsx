import Button from 'components/Button'
import Icon from 'components/Icon'
import Input from 'components/Input'
import styles from './reset.module.scss'
import Logo from 'components/Logo'

const ResetPasswordPage = () => {
	return (
		<main className={styles.resetPw}>
			<section className={styles.wrapper}>
				<div className={styles.topSection}>
					<div className={styles.logodiv}>
						<Logo />
					</div>
					<h2>Reset password</h2>
					<p>Enter your new password for your account.</p>
				</div>
				<form style={{ marginTop: '20px' }}>
					<Input type="password" label="New Password" leftIcon={{ name: 'padlock', pos: [0, 28] }} required={true}
						rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
					/>
					<Input type="password" label="Confirm New Password" leftIcon={{ name: 'padlock', pos: [0, 28] }}
						rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
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