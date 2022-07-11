
import Button from 'common/Button'
import Icon from 'common/Icon'
import Input from 'common/Input'
import fields from 'components/ResetPassword/fields'
import styles from './changepassword.module.scss'

const ChangePassword = () => {
	return (
		<section className={styles.changePassword}>
			<div className={styles.left}>
				<h3>Change Password</h3>
				<p>
					Change your password to a new one.
				</p>
			</div>
			<div className={styles.right}>
				<form>
					<Input
						field={fields.password}
						leftIcon={{ name: 'padlock', pos: [28, 0] }}
						rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
					/>
					<Input
						field={fields.password2}
						leftIcon={{ name: 'padlock', pos: [28, 0] }} rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}

					/>
					<Input
						field={fields.password2}
						leftIcon={{ name: 'padlock', pos: [28, 0] }} rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}

					/>
					<div className={styles.btn_con}>
						<Button bg="#C03E21">
							Change password
							<Icon id="arrow-right" width={20} height={20} />
						</Button>
					</div>

				</form>
			</div>
		</section>
	)

}
export default ChangePassword