import Link from 'next/link'
import Button from 'components/Button'
import Icon from 'components/Icon'
import Input from 'components/Input'
import styles from './forgot.module.scss'
import Logo from 'components/Logo'

const ForgotPwPage = () => {
	return (
		<main className={styles.forgotPw}>
			<section className={styles.wrapper}>
				<div className={styles.topSection}>
					<div className={styles.logodiv}>
						<Logo />
					</div>
					<h2>Forgot Password</h2>
					<p>Please provide the email address you used when you signed up for your MoneyAfrica account.</p>
				</div>
				<form style={{ marginTop: '20px' }}>
					<Input type="email" label="Email Address" leftIcon={{ name: 'envelope', pos: [0, 28] }} required={true} />
				</form>
				<div className={styles.sign_up}>
					<div>
						<span>Remember Password?</span>
						<Link href="/login" ><a className={styles.a}>Log In</a>
						</Link>
					</div>
					<Button>
						<>
							<Link href="/reset-password">
								<a style={{ color: "#fff", textDecoration: 'none' }}>Send reset link</a>
							</Link>
							<Icon id="arrow-right" width={20} height={20} />
						</>
					</Button>
				</div>
			</section>


		</main >
	)
}

export default ForgotPwPage