import { Logo2 } from 'common/Logo'
import Input from 'common/Input'
import Icon from 'common/Icon'
import Image from 'next/image'
import styles from './signup.module.scss'
import Link from 'next/link'
import Button from 'common/Button'

interface Props {

}

const SignUpPage: React.FC<Props> = () => {
	return (
		<div className={`signupWrapper ${styles.signup}`}>
			<main className={styles.wrapper}>
				<section className={styles.left}>
					<div className={styles.imgdiv}>
						<Logo2 />
					</div>
					<p>
						Money Africa is a subscription-based Education Technology (EdTech) platform providing access to free and paid financial education for learners.
					</p>
					<div className={styles.girl_div}>
						<Image src="/assets/girl.png" layout="fill" alt="girl" />
						<div className={styles.botm_div} />
					</div>

				</section>
				<section className={styles.right}>
					<div className={styles.formdiv}>
						<div className="center">
							<h2 className={`title ${styles.title}`}>Get Started</h2>
							<p>Start building your financial knowledge bank with our   over 45+ ready-made courses.</p>
						</div>

						<form className={styles.signupForm}>
							<div className={styles.split}>
								<Input type="text" leftIcon={{ name: 'user' }} required={true} label="First name" />
								<Input type="text" leftIcon={{ name: 'user' }} required={true} label="Last name" />
							</div>

							<Input type="email" leftIcon={{ name: 'envelope' }} required={true} label="Email Address" />
							<div className={styles.split_phone}>
								<Input type="text" leftIcon={{ name: 'phone' }} rightIcon={{ name: 'caret-down', pos: [28, 72] }}
									required={true} label="Phone number" readOnly
								>
									<Icon id="nigeria" width={24} height={24} className={styles.nigeria} />
								</Input>
								<Input type="tel" required={true} inputClass={styles.phone}>
									<span className={styles.number}>+234</span>
								</Input>
							</div>
							<Input type="password" label="Enter Password" leftIcon={{ name: 'padlock' }}
								rightIcon={{ name: 'lock-password', pos: [18, '95%'] }}
							/>
							<Input type="password" label="Re-enter Password" leftIcon={{ name: 'padlock' }}
								rightIcon={{ name: 'lock-password', pos: [18, '95%'] }}
							/>
							<Input type="text" leftIcon={{ name: 'hamper' }} label="Referral code (optional)" />
							<p className={styles.tnc}>By signing up, you agree to our <Link href="/reset-password">
								<a className={styles.a}> Terms of Use</a></Link> and <Link href="/forgot-password"><a className={styles.a}>Privacy Policy.</a></Link>
							</p>
							<div className={styles.sign_up}>
								<div>
									<span>Already have an account?</span>
									<Link href="/signup" ><a className={styles.a}>Sign Up</a>
									</Link>
								</div>
								<Button>Sign up <Icon id="arrow-right" width={20} height={20} /></Button>
							</div>

						</form>
					</div>


				</section>

			</main>
		</div >
	)
}
export default SignUpPage