/* eslint-disable react-hooks/exhaustive-deps */
//Omit<I,'k','l'> Pick<I,'l','k'> Required<I> Partial<I>
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import styles from './styles.module.scss';
import cx from 'classnames';
import Button, { BtnLoader } from 'common/Button';
import Image from 'next/image';
import Icon from 'common/Icon';
import React, { useEffect, useState } from 'react';
import useForm from 'hooks/useForm';
import Input from 'common/Input';
import axios from 'helpers/axios';
import { initConfig, configureFW } from './function';
import { toast } from 'react-toastify';

export const PayPlanView = ({ onSubscribed, loading }) => {
  return (
    <>
      <div className={styles.payplan}>
        <div className={styles.hder}>
          <h2 className="title">Choose suscription type</h2>
          <p>Let us know how often you want the payment to be processed.</p>
        </div>
        <section className={styles.choosepayx}>
          {loading && (
            <BtnLoader classStyle={`${styles.codeloading} abs-center`} />
          )}
          {!loading && (
            <>
              <article onClick={() => onSubscribed('auto')}>
                <div className={styles.sub_desc_wrapper}>
                  <Image src="/assets/card.png" layout="fill" alt="" />
                </div>
                <h2 className="title">Auto-renew</h2>
                <p>
                  Subscription charges would be deducted from your account every
                  month.
                </p>
              </article>
              <article onClick={() => onSubscribed()}>
                <div className={styles.sub_desc_wrapper}>
                  <Image src="/assets/bag.png" layout="fill" alt="" />
                </div>
                <h2 className="title">One-time payment</h2>
                <p>
                  Only one-time subscription payment will be deducted from your
                  account.
                </p>
              </article>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export const SubForm = (props) => {
  const { onChangeInput, onBlurInput, onConfirmCode, discountCode } = props;

  const onWithNoCode = () => {
    props.changeStep(2);
  };

  return (
    <>
      <form className={styles.form}>
        <Input
          field={discountCode}
          wrapperClass={styles.inputWraper}
          onChange={onChangeInput}
          onBlur={onBlurInput}
          leftIcon={{ name: 'hamper' }}
        />
        <div className="flx_jc_sb">
          <Button
            bg="#c03e21"
            onClick={onConfirmCode}
            disabled={!discountCode.value}
            loading={props.submitting}
          >
            Subscribe with code
          </Button>
          <Button
            className={styles.skip}
            onClick={onWithNoCode}
            disabled={discountCode.value}
          >
            Subscribe with no code
          </Button>
        </div>
      </form>
    </>
  );
};

///// ####
const SubCard = (props) => {
  const fields = {
    discountCode: {
      name: 'discountCode',
      value: '',
      type: 'text',
      label: 'Discount code',
      placeholder: 'Enter your discount code',
      error: '',
      required: false,
    },
  };

  const { onChangeInput, onBlurInput, inputs } = useForm(fields);

  const { discountCode } = inputs;

  const { plans, curPlan, step } = props;

  const body = {};
  const [payPlan, showPayPlan] = useState(false);

  const [_subdata, setSubdata] = useState({});

  const [loading, setLoading] = useState(false);
  const [planId, setPlanId] = useState(null);

  const [fwConfig, setFwConfig] = useState(initConfig);
  const handleFlutterPayment = useFlutterwave(fwConfig);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!fwConfig.tx_ref) return;

    handleFlutterPayment({
      callback: (response) => {
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
    });
  }, [fwConfig]);

  const onSubscribed = async (auto = false) => {
    try {
      setLoading(true);
      const body = { planId };
      const payPlan = auto ? props.plan?.fwPlan?.id : null;

      if (discountCode?.value) body.discountCode = discountCode?.value;
      else delete body.discountCode;

      const { data } = await axios.post(`/subscriptions`, body);

      const { plan, user, amount, id: subscriptionID } = data;

      const config = configureFW({
        subscriptionID,
        payPlan,
        amount,
        user,
        plan,
        host: global?.window?.location.origin,
      });

      setFwConfig(config);
      setSubdata(data);
      showPayPlan(false);
      // setIsOpen(false);
    } catch (e) {
      console.log(e, 100);
      toast.error('Subscription failed');
    }
    setLoading(false);
  };

  const onConfirmCode = async (e) => {
    e.preventDefault();
    if (discountCode.value < 1) return;
    try {
      setSubmitting(true);
      body.discountCode = discountCode.value;
      await axios.get(`/subscriptions/discount/${discountCode?.value}`);
      onClickedCard(2);
      setSubmitting(false);
    } catch {
      toast.error('Discount code could not be verified');
      setSubmitting(false);
    }
  };

  // const onToggleModal = (isopen) => {
  // 	setIsOpen(isopen)
  // 	if(!isopen) showPayPlan(false)
  // }

  const onClickedCard = (stp = 0, id = null) => {
    props.onClickSubCard(stp);
    if (id) setPlanId(id);
  };

  return (
    <>
      {step === 0 &&
        plans.map((plan) => (
          <article key={plan?.id}>
            <p
              className="rec"
              style={{
                visibility: plan?.id === curPlan?.id ? 'visible' : 'hidden',
              }}
            >
              Current Plan
            </p>
            <div
              className={cx(styles.sub_card, {
                [styles.hylyt]: plan?.id === curPlan?.id,
              })}
            >
              <div
                className={`flx_ac ${styles.img_dx} ${styles.loaderWrapper}`}
              >
                <div className={styles.img_bx}>
                  <span>
                    <Image src="/assets/graph.png" alt="graph" layout="fill" />
                  </span>
                </div>
                <div className="flx_jc_ac_cl">
                  <span className={styles.amt}>#{plan.price}</span>
                  <span>
                    /{plan.duration} {plan.duration > 12 ? 'days' : 'months'}
                  </span>
                </div>
              </div>
              <p className={styles.p}>
                <Icon id="light-cicle-mark" />
                &nbsp; Autorenews every {plan.duration}{' '}
                {props.duration > 12 ? 'days' : 'months'}.
              </p>
              <p className={styles.p}>
                <Icon id="light-cicle-mark" />
                &nbsp; Access to everything - video &amp; article courses.
              </p>
              {!curPlan?.id && (
                <Button
                  onClick={() => onClickedCard(1, plan?.id)}
                  disabled={plan?.id === curPlan?.id}
                >
                  Subscribe to this plan
                  <Icon id="arrow-right" width={20} height={20} />
                </Button>
              )}
            </div>
          </article>
        ))}
      {step === 1 && (
        <SubForm
          planId={planId}
          onChangeInput={onChangeInput}
          onBlurInput={onBlurInput}
          onConfirmCode={onConfirmCode}
          discountCode={discountCode}
          submitting={submitting}
          changeStep={onClickedCard}
        />
      )}

      {step === 2 && (
        <PayPlanView
          onSubscribed={onSubscribed}
          payPlan={payPlan}
          loading={loading}
        />
      )}
    </>
  );
};

export default SubCard;
