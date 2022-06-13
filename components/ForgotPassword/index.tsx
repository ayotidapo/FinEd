import Link from 'next/link'
import Button from 'common/Button'
import Icon from 'common/Icon'
import Input from 'common/Input'
import styles from './forgot.module.scss'
import Logo from 'common/Logo'

const ForgotPwPage = () => {
	return (
		<main className={`auth_page`}>
			<section className='wrapper'>
				<div className='topSection'>
					<div className='logo_div'>
						<Logo />
					</div>
					<h2 className='title'>Forgot Password</h2>
					<p>Please provide the email address you used when you signed up for your MoneyAfrica account.</p>
				</div>
				<form style={{ marginTop: '20px' }}>
					<Input type="email" label="Email Address" leftIcon={{ name: 'envelope', pos: [28, 0] }} required={true} />
				</form>
				<div className='sign_up'>
					<div>
						<span>Remember Password?</span>
						<Link href="/login" ><a className='a'>Log In</a>
						</Link>
					</div>
					<Button className={styles.resent_btn}>
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