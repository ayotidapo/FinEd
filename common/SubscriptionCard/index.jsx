/* eslint-disable react-hooks/exhaustive-deps */
//Omit<I,'k','l'> Pick<I,'l','k'> Required<I> Partial<I>
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import styles from './styles.module.scss';
import cx from 'classnames'
import Button, { BtnLoader } from 'common/Button';
import Image from 'next/image';
import Icon from 'common/Icon';
import React, { useEffect, useState } from 'react';
import Modal from 'common/Modal';
import useForm from 'hooks/useForm';
import Input from 'common/Input';
import axios from 'axios';
import { initConfig, configureFW } from './function';



const SubscriptionCard = (props) => {
	const fields = {
		discountCode: {
			name: 'discountCode',
			value: '',
			type: 'text',
			label: 'Discount code',
			placeholder: 'Enter your discount code', error: '',
			required: false
		}
	}

	const { plan, curPlan } = props
	const { duration, id: plan_id } = plan
	const { onChangeInput, onBlurInput, inputs } = useForm(fields);
	const { discountCode } = inputs
	const body = {}
	const [isOpen, setIsOpen] = useState(false)
	const [payPlan, showPayPlan] = useState(false)
	const [planId, setPlanId] = useState('')
	const [_subdata, setSubdata] = useState({})
	const [fwConfig, setFwConfig] = useState(initConfig)
	const [loading, setLoading] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	
	const onToggleModal = (isopen) => {
		setIsOpen(isopen)
		if(!isopen) showPayPlan(false)
	}

	const onClickedCard=(planId) => {
		setPlanId(planId)
		onToggleModal(true)
	}

	

	const handleFlutterPayment = useFlutterwave(fwConfig);
	
	useEffect(() => {
		
		if (!fwConfig.tx_ref) return
		handleFlutterPayment({
			callback: (response) => {
				console.log(response.flw_ref)
				closePaymentModal() // this will close the modal programmatically
			},
			onClose: () => { },
		});
		

	}, [fwConfig])

	

	const onSubscribed = async (discountCode) => {

		try {
			setLoading(true)
			const body = { planId }
			if (discountCode) body.discountCode = discountCode

			const { data } = await axios.post(`/subscriptions`, body);

			const { plan, user, amount, id: subscriptionID } = data


			const config = configureFW({ subscriptionID, payPlan, amount, user, plan })


			setFwConfig(config)
			setSubdata(data)
			showPayPlan(false)
			setIsOpen(false)

		} catch (e) {

		}
		setLoading(false)
	}

	const onConfirmCode = async (e) => {
		e.preventDefault()
		if (discountCode.value < 1) return;
		try {
			setSubmitting(true)
			body.discountCode = discountCode.value
			await axios.get(`/subscriptions/discount/${discountCode?.value}`);
			showPayPlan(true)
			

		} catch {
			setSubmitting(false)

		}



	}

	return (
		<>
			<Modal openModal={isOpen} onToggle={onToggleModal} modalClass={payPlan ? styles.modalClass : styles.modalClass2 }>
				<div className={styles.enter_code_div}>					
						
                    {payPlan && (
						<>
						{loading ? <BtnLoader classStyle={`${styles.codeloading} abs-center`} /> :
						<div className={styles.payplan}>
							<div className={styles.hder}>
								<h2 className='title'>Choose suscription type</h2>
								<p>Let us know how often you want the payment to be processed.</p>
							</div>
							<section className={styles.choosepay}>
								<article onClick={() => onSubscribed()}>
									<div style={{width:'50px',height:'50px',position:'relative'}}> 
									 <Image src='/assets/card.png' layout='fill'/>
									</div>
									<h2 className='title'>Auto-renew</h2>
									<p>
									Subscription charges would be deducted from your account every month.
									</p>
								
								</article>
								<article onClick={() => onSubscribed()}>
									<div style={{width:'50px',height:'50px',position:'relative'}}> 
									  <Image src='/assets/card.png' layout='fill'/>
									</div>
									<h2 className='title'>One-time payment</h2>
									<p>
									Only one-time subscription payment will be deducted from your account.
									</p>
								
								</article>
							</section>

						</div>
                    }
						</>
					   )
					}

					{ !payPlan && 
						<form>
						
					
					        
							<Input field={discountCode} wrapperClass={styles.inputWraper} onChange={onChangeInput} onBlur={onBlurInput} leftIcon={{ name: 'hamper' }} />
							<div className='flx_jc_sb'>
								<Button bg="#c03e21" onClick={onConfirmCode} disabled={!discountCode.value} loading={submitting}>Subscribe with code</Button>
								<Button className={styles.skip} onClick={() => showPayPlan(true)} disabled={discountCode.value}>Subscribe with no code</Button>
							</div>
						
						
						
						</form>
					}

				</div>
			</Modal>
			<article key={plan?.id} >

				<p className="rec">Recomended</p>
				<div  className={cx(styles.sub_card,{[styles.hylyt]: plan?.id===curPlan?.id })}>
					<div className={`flx_ac ${styles.img_dx}`}>
						<div className={styles.img_bx}>
							<span>
								<Image src="/assets/graph.png" alt="graph" layout="fill" />
							</span>
						</div>
						<div className="flx_jc_ac_cl">
							<span className={styles.amt}>#{plan.price}</span>
							<span>/{duration} {duration > 12 ? 'days' : 'months'}</span>
						</div>
					</div>
					<p className={styles.p}>
						<Icon id="light-cicle-mark" />
						&nbsp; Autorenews every {duration} {duration > 12 ? 'days' : 'months'}.
					</p>
					<p className={styles.p}>
						<Icon id="light-cicle-mark" />
						&nbsp; Access to everything - video &amp; article courses.
					</p>
					<Button onClick={() => onClickedCard(plan_id)}>
						Subscribe to this plan
						<Icon id="arrow-right" width={20} height={20} />
					</Button>
				</div>
			</article>

		</>
	);
};

export default SubscriptionCard;
