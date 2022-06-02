import Logo from 'components/Logo';
import Icon from 'components/Icon';
import Input from 'components/Input';
import Button from 'components/Button';
import VideoCard from 'components/VideoCard'
import styles from './videos.module.scss'


const VideoPage: React.FC = () => {

	return (
		<>
			<header className={styles.header_wrap}>
				<div className={styles.header_sec}>
					<div>
						<div className={styles.logo_box}>
							<Logo />
						</div>
						<span className={`hand ${styles.xplore}`}>Explore</span>
						<span className={`hand ${styles.cr_dn}`}>
							<Icon id="caret-down" width={24} height={24} />
						</span>
					</div>
					<div>
						<Input type="text" leftIcon={{ name: 'search' }} wrapperClass={styles.wrapClass}
							inputClass={styles.inptClass} placeholder="search"
						/>
						<Button className={styles.logIn}>Log In</Button>
						<Button className={styles.btn}>Get Started</Button>

					</div>
				</div>
				<div className={styles.topics}>
					<h2 className="title" >Learn with videos</h2>
					<span className={`hand ${styles.xplore}`}>Filter Topics</span>
					<span className={`hand ${styles.cr_dn}`}>
						<Icon id="caret-down" width={24} height={24} />
					</span>
				</div>

				{/* <Star /> */}
			</header>
			<main>
				<div className={styles.content_wrap}>
					<section className={styles.content_tabs}>
						<span>Articles (14)</span>
						<span>Videos (14)</span>
						<div className={styles.content_sort}>
							<span style={{ color: '#7C7C7C' }}>Sort by &nbsp;&nbsp;</span>
							<span className={`hand`}>Latest videos</span>
							<span className={`hand ${styles.cr_dn}`}>
								<Icon id="caret-down" width={24} height={24} />
							</span>
						</div>
					</section>
					<section className={styles.content_items_wrap}>
						{
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'q', 'w'].map(k => <VideoCard key={k} />)
						}


					</section>


				</div>
			</main>
		</>
	)
}

export default VideoPage