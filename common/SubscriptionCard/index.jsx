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
	const [payMode, setPayMode] = useState(false)
	const [planId, setPlanId] = useState('')
	const [_subdata, setSubdata] = useState({})
	const [fwConfig, setFwConfig] = useState(initConfig)
	const [submitting, setSubmitting] = useState(false)
	
	const onToggleModal = (isopen) => {
		setIsOpen(isopen)
	}

	const onClickedCard = (planId) => {
		setPayMode(true)
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
			setSubmitting(true)
			const body = { planId }
			if (discountCode) body.discountCode = discountCode

			const { data } = await axios.post(`/subscriptions`, body);

			const { plan, user, amount, id: subscriptionID } = data


			const config = configureFW({ subscriptionID, amount, user, plan })


			setFwConfig(config)
			setSubdata(data)

		} catch (e) {

		}
		setSubmitting(false)
	}

	const onConfirmCode = async (e) => {
		e.preventDefault()
		if (discountCode.value < 1) return;
		try {
			setSubmitting(true)
			body.discountCode = discountCode.value
			await axios.get(`/subscriptions/discount/${discountCode?.value}`);
			await onSubscribed(discountCode?.value)

		} catch {
			setSubmitting(false)

		}



	}

	return (
		<>
			<Modal openModal={isOpen} onToggle={onToggleModal} modalClass={styles.modalClass}>
				<div className={styles.enter_code_div}>					
						
                    {payMode && (
						<div className={styles.payplan}>
							<h2 className='title'>Choose suscription type </h2>
						</div>
					   )
					}

						<form>
						{
						submitting && !payMode ? <BtnLoader classStyle={`${styles.codeloading} abs-center`} /> :
						<>
							<Input field={discountCode} wrapperClass={styles.inputWraper} onChange={onChangeInput} onBlur={onBlurInput} leftIcon={{ name: 'hamper' }} />
							<div className='flx_jc_sb'>
								<Button bg="#c03e21" onClick={onConfirmCode} disabled={!discountCode.value}>Subscribe with code</Button>
								<Button className={styles.skip} onClick={() => onSubscribed()} disabled={discountCode.value}>Subscribe with no code</Button>
							</div>
							</>
						}
						</form>
					

				</div>
			</Modal>
			<article key={plan.id} >
				<p className="rec">Recomended</p>
				<div  className={cx(styles.sub_card,{[styles.hylyt]: plan.id===curPlan?.id })}>
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
