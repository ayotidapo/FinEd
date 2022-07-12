import styles from './styles.module.scss'
import Button from 'common/Button'
import Image from 'next/image'
import Icon from 'common/Icon'

const SubscriptionArticles = () => {
	return (
		<>
			<article>
				<p className='rec'>Recomended</p>
				<div className={styles.sub_card}>
					<div className={`flx_ac ${styles.img_dx}`}>
						<div className={styles.img_bx}>
							<span>
								<Image src='/assets/graph.png' alt="graph" layout='fill' />
							</span>

						</div>
						<div className='flx_jc_ac_cl'>
							<span className={styles.amt}>#10,000</span>
							<span>/3 months</span>
						</div>
					</div>
					<p className={styles.p}>
						<Icon id='light-cicle-mark' />&nbsp;
						Autorenews every 6 months.
					</p>
					<p className={styles.p}>
						<Icon id='light-cicle-mark' />&nbsp;
						Access to everything - video &amp; article courses.
					</p>
					<Button>
						Subscribe to this plan
						<Icon id="arrow-right" width={20} height={20} />
					</Button>
				</div>
			</article>
			<article>
				<p className='rec'> Recomended</p>
				<div className={styles.sub_card}>
					<div className={`flx_ac ${styles.img_dx}`}>
						<div className={styles.img_bx}>
							<span>
								<Image src='/assets/card.png' alt="card" layout='fill' />
							</span>

						</div>
						<div className='flx_jc_ac_cl'>
							<span className={styles.amt}>#10,000</span>
							<span>/6 months</span>
						</div>
					</div>
					<p className={styles.p}>
						<Icon id='light-cicle-mark' />&nbsp;
						Autorenews every 6 months.
					</p>
					<p className={styles.p}>
						<Icon id='light-cicle-mark' />&nbsp;
						Access to everything - video &amp; article courses.
					</p>
					<Button >
						Subscribe to this plan
						<Icon id="arrow-right" width={20} height={20} />
					</Button>
				</div>
			</article>
			<article>
				<p className='rec'> Recomended</p>
				<div className={styles.sub_card}>
					<div className={`flx_ac ${styles.img_dx}`}>
						<div className={styles.img_bx}>
							<span>
								<Image src='/assets/chrome.png' alt="chrome" layout='fill' />
							</span>

						</div>
						<div className='flx_jc_ac_cl'>
							<span className={styles.amt}>#10,000</span>
							<span>/One year</span>
						</div>
					</div>
					<p className={styles.p}>
						<Icon id='light-cicle-mark' />&nbsp;
						Autorenews every 6 months.
					</p>
					<p className={styles.p}>
						<Icon id='light-cicle-mark' />&nbsp;
						Access to everything - video &amp; article courses.
					</p>
					<Button>
						Subscribe to this plan
						<Icon id="arrow-right" width={20} height={20} />
					</Button>
				</div>
			</article>
		</>
	)
}

export default SubscriptionArticles