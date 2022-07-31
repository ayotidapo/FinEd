import axios from 'axios'
import Button from 'common/Button'
import Icon from 'common/Icon'
import Input from 'common/Input'
import fields from './fields'
import styles from './changepassword.module.scss'
import useForm from 'hooks/useForm'
import { useState } from 'react'


const ChangePassword = () => {
	const { onBlurInput, onChangeInput, getPayload } = useForm(fields)
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async () => {
		try {
			setSubmitting(true);
			const body = getPayload();
			const { data } = await axios.patch(`/users/profile`, body)

			setSubmitting(false);
			console.log(data)
		} catch (e) {
			setSubmitting(false);
		}

	}
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
						field={fields.OldPassword}
						leftIcon={{ name: 'padlock', pos: [28, 0] }}
						rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
						onChange={onChangeInput}
						onBlur={onBlurInput}
					/>
					<Input
						field={fields.NewPassword}
						leftIcon={{ name: 'padlock', pos: [28, 0] }}
						rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
						onChange={onChangeInput}
						onBlur={onBlurInput}

					/>
					<Input
						field={fields.password2}
						leftIcon={{ name: 'padlock', pos: [28, 0] }}
						rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
						onChange={onChangeInput}
						onBlur={onBlurInput}

					/>
					<div className={styles.btn_con}>
						<Button bg="#C03E21" loading={submitting} onClick={onSubmit}>
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