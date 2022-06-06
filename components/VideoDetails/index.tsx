import Button from 'common/Button'
import { useRouter } from 'next/router'
import HeaderWtSearch from 'common/HeaderWtSearch'
import Icon from 'common/Icon'
import LabelTag from 'common/LabelTag'
import Star from 'common/Ratings'
import Image from 'next/image'
import styles from './videodetails.module.scss'


const VideoDetailsPage: React.FC = () => {
	const router = useRouter()
	return (
		<>
			<header className={styles.header}>
				<HeaderWtSearch />
			</header>
			<div className={styles.jumbotron}>
				<nav className={styles.breadcrumb}>
					<ul>
						<li style={{ marginTop: "-2px" }}>
							<Icon id="home" height={24} width={24} className="hand" />
							<Icon id="caret-right" height={15} width={15} style={{ margin: "0 10px" }} />
						</li>
						<li>
							<span className="hand">Videos</span>
							<Icon id="caret-right" height={15} width={15} style={{ margin: "0 10px" }} />
						</li>
						<li>
							<span>The Best Crypto Wallets for Binance Smart Chain (BSC)</span>
						</li>

					</ul>
				</nav>
				<div className={styles.details_sec}>
					<section className={styles.img_details}>
						<Image src="/assets/girl.png" layout='fill' alt="video_img" />
						<div className='overlay' />
					</section>

					<section className={styles.info_details}>
						<span className={styles.labeltag}>
							<LabelTag color="#F9D68A" >Money Africa</LabelTag>
							<LabelTag color="#F5C3C8" >Privacy</LabelTag>
							<LabelTag color="#ABEAD3" >Mining</LabelTag>
							<LabelTag >+3</LabelTag>
						</span>
						<h2 className={`title ${styles.title}`}>
							The Best Crypto Wallets for Binance Smart Chain (BSC)
						</h2>
						<div className={styles.starwrap}>
							<Star /><Star /><Star /><Star /><Star /><span>4.3</span>
						</div>
						<div className={`intermediate ${styles.min_details}`}>
							<span className='bar' /><span className='bar' /><span className='bar' />&nbsp; Intermediate
							&nbsp;&nbsp;
							<Icon id="clock" width={20} height={20} /> &nbsp;15mins
						</div>
					</section>
				</div>
			</div >
			<div className={styles.tabs}>
				<span>About this course</span>
				<span>Course content</span>
				<span>Ratings</span>
				<article className={styles.getstarted}>
					<h2 className='title'>
						Get Started
					</h2>
					<Button className={styles.si_btn} onClick={() => router.push('/signup')}>
						Sign up with email <Icon id="arrow-right" width={20} height={20} />
					</Button>
					<p className={styles.pp}>
						By signing up, you agree to our <span>Terms of Use</span> and<br />
						<span>Privacy Policy</span>.
					</p>
				</article>
			</div>
			<section className={styles.about}>
				<h2 className='title'>About this course</h2>
				<p>
					In this class, Documentary Photographer and Photojournalist,
					KC Nwakalor breaks down the various compositional techniques you can apply
					in order to have a better outcome in your photographs.
				</p>
				<p>
					Composition refers to the placement and relationship of elements within a picture.
					The arrangement of elements in a scene, the angle they are shot at, the height we shoot from,
					and the distance the photo is taken from, can completely change the final outcome of the photograph.
					The composition can ultimately determine the difference between a good and a bad...
					<span style={{ color: '#C03E21', fontWeight: 'bold' }} className="hand"> Show more.</span>
				</p>
			</section>
			<section className={styles.content}>
				<h2 className='title'>Course content</h2>
				<ul>
					<li>
						<span><Icon id="padlock" width={20} height={20} /> What is a Tax Free Savings Account(TFSA)</span>
						<span><Icon id="clock" width={20} height={20} /> &nbsp;15mins</span>
					</li>
					<li>
						<span><Icon id="padlock" width={20} height={20} /> What is an RRSP &amp; How does it work?</span>
						<span><Icon id="clock" width={20} height={20} /> &nbsp;15mins</span>
					</li>
					<li>
						<span><Icon id="padlock" width={20} height={20} /> Chequing vs Savings Account</span>
						<span><Icon id="clock" width={20} height={20} /> &nbsp;15mins</span>
					</li>
					<li>
						<span><Icon id="padlock" width={20} height={20} /> What is a Tax Free Savings Account(TFSA)</span>
						<span><Icon id="clock" width={20} height={20} /> &nbsp;15mins</span>
					</li>
					<li>
						<span><Icon id="padlock" width={20} height={20} /> What is Corporate Account?</span>
						<span><Icon id="clock" width={20} height={20} /> &nbsp;15mins</span>
					</li>
					<li>
						<span><Icon id="padlock" width={20} height={20} /> What is LIRA?</span>
						<span><Icon id="clock" width={20} height={20} /> &nbsp;15mins</span>
					</li>
				</ul>
			</section>
			<section className={styles.ratings}>
				<h2 className='title' style={{ marginBottom: '20px' }}>Ratings</h2>
				<article className={styles.comment}>
					<div className={styles.avatar}>
						MA
					</div>
					<div className={styles.comment_txt}>
						<div className={styles.sp}>
							<span>Moronke Aniolaola</span>&nbsp;&nbsp;&nbsp;&nbsp;Aug 24,2021
						</div>
						<div className="starwrap">
							<Star /><Star /><Star /><Star /><Star /><span style={{ color: "#7c7c7c" }}>4.3</span>
						</div>
						<p>
							So far so good, first day of use was impressive, but the plastic bucket is too light weight can break easily if handled by children. But overall.... Good but time will tell.
						</p>

					</div>

				</article>
				<article className={styles.comment}>
					<div className={styles.avatar}>
						MA
					</div>
					<div className={styles.comment_txt}>
						<div className={styles.sp}>
							<span>Moronke Aniolaola</span>&nbsp;&nbsp;&nbsp;&nbsp;Aug 24,2021
						</div>
						<div className="starwrap">
							<Star /><Star /><Star /><Star /><Star /><span style={{ color: "#7c7c7c" }}>4.3</span>
						</div>
						<p>
							So far so good, first day of use was impressive, but the plastic bucket is too light weight can break easily if handled by children. But overall.... Good but time will tell.
						</p>

					</div>

				</article><article className={styles.comment}>
					<div className={styles.avatar}>
						MA
					</div>
					<div className={styles.comment_txt}>
						<div className={styles.sp}>
							<span>Moronke Aniolaola</span>&nbsp;&nbsp;&nbsp;&nbsp;Aug 24,2021
						</div>
						<div className="starwrap">
							<Star /><Star /><Star /><Star /><Star /><span style={{ color: "#7c7c7c" }}>4.3</span>
						</div>
						<p>
							So far so good, first day of use was impressive, but the plastic bucket is too light weight can break easily if handled by children. But overall.... Good but time will tell.
						</p>

					</div>

				</article><article className={styles.comment}>
					<div className={styles.avatar}>
						MA
					</div>
					<div className={styles.comment_txt}>
						<div className={styles.sp}>
							<span>Moronke Aniolaola</span>&nbsp;&nbsp;&nbsp;&nbsp;Aug 24,2021
						</div>
						<div className="starwrap">
							<Star /><Star /><Star /><Star /><Star /><span style={{ color: "#7c7c7c" }}>4.3</span>
						</div>
						<p>
							So far so good, first day of use was impressive, but the plastic bucket is too light weight can break easily if handled by children. But overall.... Good but time will tell.
						</p>

					</div>

				</article>
			</section>
		</>
	)
}

export default VideoDetailsPage


