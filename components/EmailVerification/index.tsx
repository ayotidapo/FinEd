import styles from './verify.module.scss'
import Logo from 'common/Logo'
import Input from 'common/Input'
import Button from 'common/Button'
import Icon from 'common/Icon'
const EmailVerificationPage = () => {
	return (
		<main className={styles.email_verification}>

			<section className={styles.section}>
				<div className={styles.go_back}>
					&lt;&nbsp;&nbsp; Go back
				</div>
				<div className={styles.wrapper}>
					<div className={styles.logo_box}>
						<Logo />
					</div>
					<div className={styles.info}>
						<h3 className='title'>Email Verification</h3>
						<p>
							Protecting your account is our top priority. A verification code has been sent to your email address. Please input the code below to complete your registration.
						</p>
						<div className={styles.inputs_div}>
							<Input />
							<Input />
							<Input />
							<Input />
							<Input />
							<Input />
						</div>
						<div className={styles.complete}>

							<p>Didn&apos;t receive code? <span className="hand">Resend</span></p>
							<Button bg="#C03E21">
								Complete Sign up
								<Icon id="arrow-right" width={20} height={20} />
							</Button>
						</div>
					</div>
				</div>

			</section>


		</main>
	)
}

export default EmailVerificationPage