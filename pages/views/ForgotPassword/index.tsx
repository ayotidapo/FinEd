import Image from 'next/image'
import Link from 'next/link'
import Button from 'pages/components/Button'
import Icon from 'pages/components/Icon'
import Input from 'pages/components/Input'
import styles from 'pages/views/ForgotPassword/forgot.module.scss'

const ForgotPwPage = () => {
	return (
		<main className={styles.forgotPw}>
			<section className={styles.wrapper}>
				<div className={styles.topSection}>
					<div className={styles.logodiv}>
						<Image src="/assets/logo.png" layout="fill" alt="logo" />
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