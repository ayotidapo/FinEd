
import Button from 'common/Button'
import Icon from 'common/Icon'
import styles from './referfriend.module.scss'

const ReferFriend = () => {
	return (
		<section className={styles.refer_friend}>
			<div className={styles.left}>
				<h3> Refer a friend to get <span style={{ color: '#C03E21' }}>10% off</span> your next subscription</h3>
				<p>
					When you refer a friend, they need to become paid subscribers for this offer to be valid.
				</p>
			</div>
			<div className={styles.right}>
				<article className={styles.art}>
					<div>
						<h3>Total no. referred</h3>
						<h2 className='title'>4</h2>
					</div>
					<div>
						<h3>Total paid subscribers</h3>
						<h2 className='title'>3</h2>

					</div>
					<div>
						<h3>Total amount gotten</h3>
						<h2 className='title'>N50,000.00</h2>

					</div>
				</article>
				<p>
					<strong> Note:</strong> You will be contacted by a member of our support team at the end of the month to receive your referral bonus.
				</p>

				<div className={styles.ref_code_box}>
					<span>Your referral code:</span>
					<div className={styles.link}>
						<h3 className='title'>
							Thelma23
							<Button> Share link</Button>
						</h3>

					</div>
					<div className='flx_ac'>
						<Icon id="copy" className='hand' />&nbsp;
						<span className='hand'>Copy code</span>
						<div className={styles.socials}>
							<Icon id="fb" width={32} height={32} />
							<Icon id="linkdIn" width={32} height={32} />
							<Icon id="whatsapp" width={32} height={32} />
							<Icon id="twitter" width={32} height={32} />
						</div>
					</div>
				</div>

			</div>

		</section>
	)
}
export default ReferFriend