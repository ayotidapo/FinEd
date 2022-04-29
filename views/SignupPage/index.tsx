import { Logo2 } from 'components/Logo'
import Image from 'next/image'
import styles from './signup.module.scss'

interface Props {

}

const SignUpPage: React.FC<Props> = () => {
	return (
		<div className={styles.signup}>
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
						<form>

						</form>
					</div>


				</section>

			</main>
		</div>
	)
}
export default SignUpPage