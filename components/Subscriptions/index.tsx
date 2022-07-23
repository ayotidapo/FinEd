
import SubscriptionArticles from 'common/SubscriptionArticles'
import styles from './subscriptions.module.scss'

const Subscriptions = () => {
	return (
		<section className={styles.subscriptions}>
			<div className={styles.left}>
				<h3> Choose your preffered plan</h3>
				<p>
					Select a plan to procees and have access to all the video
					and article courses on our platform.
				</p>
			</div>
			<div className={`right_for_sub ${styles.right}`}>
				<SubscriptionArticles />
			</div>

		</section>
	)
}

export default Subscriptions
