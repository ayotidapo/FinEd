import styles from './chooseplan.module.scss'
import SubscriptionArticles from 'common/SubscriptionArticles'
import Logo from 'common/Logo'
import Link from 'next/link'

const ChoosePlan = () => {
	return (
		<main className={styles.chooseplan}>

			<div className={styles.section}>

				<section className={styles.section_wrapper}>
					<div className={`hand ${styles.go_back}`}>
						&lt;&nbsp;&nbsp; Go back
					</div>
					<div className={styles.wrapper}>
						<div className={styles.logo_box}>
							<Logo />
						</div>
						<div className={styles.info}>
							<h3 className='title'>Choose your preferred plan</h3>
							<p>
								Choose a plan to process and have access to all the video and article courses on our platform.
							</p>

						</div>

					</div>
					<Link href="/contents/videos" >
						<a>
							<div className={`right_for_sub ${styles.choose}`}>

								<SubscriptionArticles />


							</div>
						</a>
					</Link>
					<div className={styles.link}>
						<Link href='/contents/videos'>I&apos;ll do this later</Link>
					</div>

				</section>

			</div>


		</main>
	)
}

export default ChoosePlan