import SubscriptionCard from 'common/SubscriptionCard'
import styles from './subpage.module.scss'
import { useSelector } from 'store';

export interface IPlan {
	active: boolean;
	dateCreated: string;
	dateUpdated: string;
	duration: number;
	id: string;
	name: string;
	price: number;
}


interface Props {
	plans: IPlan[]
}

const plan = {
	active: true,
	dateCreated: 'string',
	dateUpdated: 'string',
	duration: 2000,
	id: 'string',
	name: 'string',
	price: 40
}

const SubscriptionPage: React.FC<Props> = ({ plans }) => {

	const g = useSelector(state => state.plans)

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
				{plans.map((plan) => <SubscriptionCard key={plan.id} plan={plan} />)}
			</div>

		</section>
	)
}

export default SubscriptionPage 