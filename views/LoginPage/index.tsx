import Link from 'next/link'
import Button from 'components/Button'
import Icon from 'components/Icon'
import Input from 'components/Input'
import styles from './login.module.scss'
import Logo from 'components/Logo'

const LoginPage = () => {
	return (
		<main className={styles.login}>
			<section className={styles.wrapper}>
				<div className={styles.topSection}>
					<div className={styles.logodiv}>
						<Logo />
					</div>
					<h2>Welcome back</h2>
					<p>Enter the same email and password you used to sign up to access accounts.</p>
				</div>
				<form style={{ marginTop: '20px' }}>
					<Input type="email" label="Email Address" leftIcon={{ name: 'envelope', pos: [0, 28] }} required={true} />
					<Input type="password" label="Enter Password" leftIcon={{ name: 'padlock', pos: [0, 28] }}
						rightIcon={{ name: 'lock-password', pos: ['95%', 28] }}
					/>
				</form>
				<Link href="/forgot-password">
					<a className={`${styles.fg_pass} hand`}>
						Forgot Password?
					</a>
				</Link>
				<div className={styles.sign_up}>
					<div>
						<span>Have no account yet?</span>
						<Link href="/signup" ><a className={styles.a}>Sign Up</a>
						</Link>
					</div>
					<Button>Login <Icon id="arrow-right" width={20} height={20} /></Button>
				</div>
			</section>


		</main >
	)
}

export default LoginPage