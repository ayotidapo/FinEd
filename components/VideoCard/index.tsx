import Image from 'next/image'
import Icon from 'components/Icon'
import Star from 'components/Ratings'
import styles from './videocard.module.scss'

const VideoCard: React.FC = () => {
	return (
		<article className={styles.video_card}>
			<div className={styles.video_thumbnail}>
				<Image src="/assets/girl.png" layout='fill' alt="top-sec-img" />
				<div className={styles.overlay}>
					<p>
						<Icon id="bookmark" width={24} height={24} className='hand' />
					</p>
					<p>
						<Icon id="play" width={24} height={24} className='hand' />
					</p>
					<p>
						<Icon id="padlock" width={24} height={24} />
						&nbsp;
						<span style={{ paddingTop: '4px' }}>Available for premium users only</span>
					</p>
				</div>
			</div>
			<div className={styles.video_info}>
				<p className='title'>How to trade in crypto</p>
				<div className={styles.rating_div}>
					{[1, 2, 3, 4, 5].map((n) => <Star key={n} />)} &nbsp;4.3
					<span style={{ color: '#7C7C7C' }}>&nbsp;&nbsp;&nbsp;Updated Aug 9, 2021</span>
				</div>
				<p className={`expert ${styles.min_details}`}>
					<span className='bar' /><span className='bar' /><span className='bar' />&nbsp;Intermediate
					&nbsp;&nbsp;&nbsp;<Icon id="clock" width={20} height={20} />&nbsp;9 mins
					&nbsp;&nbsp;&nbsp;<Icon id="file" width={20} height={20} />&nbsp;5 courses
					&nbsp;&nbsp;&nbsp;&nbsp;<Icon id="see" width={20} height={20} />&nbsp;2,456
				</p>
				<p className={styles.content_labels}>
					<label className='btn' style={{ background: '#F9D68A' }}>
						MoneyAfrica
					</label>
					<label className='btn' style={{ background: '#F5C3C8' }}>
						Privacy
					</label>
					<label className='btn' style={{ background: '#ABEAD3' }}>
						Mining
					</label>
					<Icon id="ellipsisY" width={20} height={20} className={styles.elipsis_y} />

				</p>

			</div>

		</article>
	)
}

export default VideoCard