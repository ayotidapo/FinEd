
import HeaderWtSearch from 'common/HeaderWtSearch'
import Icon from 'common/Icon';

import VideoCard from 'common/VideoCard'
import styles from './videoslist.module.scss'


const VideosListPage: React.FC = () => {

	return (
		<>
			<header className={styles.video_header_wrap}>
				<HeaderWtSearch />
				<div className={styles.topics}>
					<h2 className="title" >Learn with videos</h2>
					<span className={`hand ${styles.xplore}`}>Filter Topics</span>
					<span className={`hand ${styles.cr_dn}`}>
						<Icon id="caret-down" width={24} height={24} />
					</span>
					<span className={`hand ${styles.filter}`}>
						<Icon id="filter" width={24} height={24} />
					</span>
				</div>
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

export default VideosListPage