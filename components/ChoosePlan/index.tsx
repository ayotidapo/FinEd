import styles from './chooseplan.module.scss';
import SubscriptionArticles from 'common/SubscriptionCard';
import { useRouter } from 'next/router';
import Logo from 'common/Logo';
import { IPlans } from 'components/SubscriptionPage';
import SubscriptionCard from 'common/SubscriptionCard';

const ChoosePlan: React.FC<IPlans> = (props) => {
  const { plans } = props;

  const router = useRouter();
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
              <h3 className="title">Choose your preferred plan</h3>
              <p>
                Choose a plan to process and have access to all the video and
                article courses on our platform.
              </p>
            </div>
          </div>

          <div className={`right_for_sub ${styles.choose}`}>
            {plans.map((plan) => (
              <SubscriptionCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div
            className={`hand ${styles.link}`}
            onClick={() => router.push('/courses')}
          >
            I&apos;ll do this later
          </div>
        </section>
      </div>
    </main>
  );
};

export default ChoosePlan;
