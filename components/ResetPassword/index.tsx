import { useRouter } from 'next/router';
import Button from 'common/Button'
import Icon from 'common/Icon'
import Input from 'common/Input'
import styles from './reset.module.scss'
import Logo from 'common/Logo'


const ResetPasswordPage = () => {
	const router = useRouter()
	return (
		<main className={`auth_page`}>
			<section className={`wrapper`}>
				<div className={`topSection`}>
					<div className='logo_div'>
						<Logo />
					</div>
					<h2 className='title'>Reset password</h2>
					<p>Enter your new password for your account.</p>
				</div>
				<form style={{ marginTop: '20px' }}>
					<Input type="password" label="New Password" leftIcon={{ name: 'padlock', pos: [28, 0] }} required={true}
						rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
					/>
					<Input type="password" label="Confirm New Password" leftIcon={{ name: 'padlock', pos: [28, 0] }}
						rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
					/>
				</form>
				<div className={`sign_up`}>

					<Button onClick={() => router.push('/forgot-password')}>Reset password <Icon id="arrow-right" width={20} height={20} /></Button>
				</div>
			</section>


		</main >
	)
}

export default ResetPasswordPage