import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import styles from './styles.module.scss';
import Button from 'common/Button';
import Image from 'next/image';
import Icon from 'common/Icon';
import { useEffect, useState } from 'react';
import { useDispatch } from 'store';
import { getActivePlans } from './functions';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';
export interface IPlan {
  active: boolean;
  dateCreated: string;
  dateUpdated: string;
  duration: number;
  id: string;
  name: string;
  price: number;
}

interface IConfig {
  public_key: string
  tx_ref: any
  amount: number
  currency: string
  payment_options: string
  customer: {
    email: string
    phonenumber: string
    name: string
  },
  customizations: {
    title: string
    description: string
    logo: string
  },
}

const SubscriptionArticles = () => {
  const [data, setState] = useState<IPlan[]>([]);
  const [payload, setPayload] = useState<IPlan>();
  const dispatch = useDispatch();

  const handleGetPlans = async () => {
    const plans = await dispatch(getActivePlans());
    if (plans) {
      setState(plans);
    }
  };

  const config: IConfig = {
    public_key: 'FLWPUBK_TEST-59f4cf5c7bf11f0a039b2e6c01f19eed-X',
    tx_ref: Date.now(),
    amount: payload?.price || 0,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'onyegood@yahoo.com',
      phonenumber: '07064586146',
      name: 'joel ugwumadu',
    },
    customizations: {
      title: payload?.name || '',
      description: payload?.name || '',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubscribToPlan = (plan: IPlan) => {
    setPayload(plan);
  }

  useEffect(() => {
    handleGetPlans();
  }, []);

  return (
    <>
    {payload?.id && <Button onClick={() => handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal()
      },
      onClose: () => {},
      })}
    >
      Subscribe new
    </Button>}
      {data &&
        data.map((plan) => (
          <article key={plan.id}>
            <p className="rec">Recomended</p>
            <div className={styles.sub_card}>
              <div className={`flx_ac ${styles.img_dx}`}>
                <div className={styles.img_bx}>
                  <span>
                    <Image src="/assets/graph.png" alt="graph" layout="fill" />
                  </span>
                </div>
                <div className="flx_jc_ac_cl">
                  <span className={styles.amt}>#{plan.price}</span>
                  <span>/{plan.duration} {plan.duration > 12 ? 'days' : 'months'}</span>
                </div>
              </div>
              <p className={styles.p}>
                <Icon id="light-cicle-mark" />
                &nbsp; Autorenews every {plan.duration} {plan.duration > 12 ? 'days' : 'months'}.
              </p>
              <p className={styles.p}>
                <Icon id="light-cicle-mark" />
                &nbsp; Access to everything - video &amp; article courses.
              </p>
              <Button onClick={() => handleSubscribToPlan(plan)}>
                Subscribe to this plan
                <Icon id="arrow-right" width={20} height={20} />
              </Button>
            </div>
          </article>
        ))
      }
    </>
  );
};

export default SubscriptionArticles;
