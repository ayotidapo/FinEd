import Link from 'next/link'
import { useRouter } from 'next/router';
import Button from 'common/Button'
import Icon from 'common/Icon'
import Input from 'common/Input'
import styles from './login.module.scss'
import Logo from 'common/Logo'

const LoginPage = () => {
	const router = useRouter()
	return (
		<main className='auth_page'>
			<section className='wrapper'>
				<div className='topSection'>
					<div className={`logo_div`}>
						<Logo />
					</div>
					<h2 className='title'>Welcome back</h2>
					<p>Enter the same email and password you used to sign up to access accounts.</p>
				</div>
				<form style={{ marginTop: '20px' }}>
					<Input type="email" label="Email Address" leftIcon={{ name: 'envelope', pos: [28, 0] }} required={true} />
					<Input type="password" label="Enter Password" leftIcon={{ name: 'padlock', pos: [28, 0] }}
						rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
					/>
				</form>
				<Link href="/forgot-password">
					<a className={`fg_pass hand`}>
						Forgot Password?
					</a>
				</Link>
				<div className='sign_up'>
					<div>
						<span>Have no account yet?</span>
						<Link href="/signup" ><a className='a'>Sign Up</a>
						</Link>
					</div>
					<Button onClick={() => router.push(`/contents/videos`)}>Login <Icon id="arrow-right" width={20} height={20} /></Button>
				</div>
			</section>


		</main >
	)
}

export default LoginPage