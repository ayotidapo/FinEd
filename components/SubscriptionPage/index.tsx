import SubscriptionCard from 'common/SubscriptionCard';
import cx from 'classnames';
import styles from './subpage.module.scss';
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

export interface IPlans {
  plans: IPlan[];
}

const SubscriptionPage: React.FC<IPlans> = ({ plans }) => {
  const { user } = useSelector((state) => state?.user);
  const { plan: curPlan } = user?.currentSubscription || {};

  return (
    <section className={styles.subscriptions}>
      <div className={styles.left}>
        <h3> Choose your preffered plan</h3>
        <p>
          Select a plan to procees and have access to all the video and article
          courses on our platform.
        </p>
      </div>
      <div className={`right_for_sub ${styles.right}`}>
        {plans.map((plan) => (
          <SubscriptionCard key={plan.id} plan={plan} curPlan={curPlan} />
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPage;
