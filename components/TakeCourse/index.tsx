import dynamic from 'next/dynamic'
import Icon from 'common/Icon'
import LabelTag from 'common/LabelTag'
import { useRouter } from 'next/router'
import styles from './watch.module.scss'
import { ICourse } from 'components/VideosListPage'
import { IContent } from 'components/VideoDetails'
import { useEffect, useState } from 'react'


const ReactPlayer = dynamic(() => import('react-player'), {
	ssr: false,
})



const TakeCoursePage: React.FC<{ course: ICourse }> = ({ course }) => {
	const router = useRouter()
	const fakeUrl = [`www.youtube.com/watch?v=oJbfMBROEO0`, 'www.youtube.com/watch?v=v21jg8wb1eU', 'www.youtube.com/watch?v=s87Y-6EgwFI']

	const { title, thumbnail, description, contents, categories, level, id } = course
	const resources = contents.filter((content: IContent) => content.type !== 'video')
	const colors = ['#F9D68A', '#F5C3C8', '#ABEAD3']

	const { vlink } = router.query
	const videolink = vlink || fakeUrl[0]

	const setUrl = (id: number) => {
		router.push(`/take-course/${course.id}/?vlink=${fakeUrl[id]}`)

	}

	return (
		<main className={styles.watch}>
			<div className={styles.top}>
				<nav className={styles.breadcrumb}>
					<ul>
						<li style={{ marginTop: '-2px' }} onClick={() => router.push('/')}>
							<Icon
								id="home"
								height={24}
								width={24}
								className="hand"

							/>
							<Icon
								id="caret-right"
								height={15}
								width={15}
								style={{ margin: '0 10px' }}
							/>
						</li>
						<li>
							<span
								className="hand"
								onClick={() => router.push('/contents/videos')}
							>
								Videos
							</span>
							<Icon
								id="caret-right"
								height={15}
								width={15}
								style={{ margin: '0 10px' }}
							/>
						</li>
						<li>
							<span>{title}</span>
						</li>
					</ul>
				</nav>

				<div className={styles.controls}></div>

			</div>
			<div className={styles.wrapper}>
				<section className={styles.content_list}>
					<p>Course content</p>

					<div className={styles.content}>
						<ul>
							{contents.map((content: IContent, i: number) =>
								<li key={content.id} className='hand' onClick={() => setUrl(i)}>
									<a className={styles.f_sp}>
										<Icon id="play" width={18} height={18} />&nbsp;{content.title}
									</a>
									<a>
										<Icon id="clock" width={18} height={18} /> &nbsp;15mins
									</a>
								</li>
							)}
						</ul>
					</div>
					<p>Resource</p>
					<div className={styles.content}>
						<ul>
							{resources.map((item: IContent, i: number) =>
								<li key={i} className='hand'>
									<a download className={styles.f_sp}>
										<Icon id="file" width={20} height={20} />&nbsp;{item.title}
									</a>

								</li>
							)}
						</ul>
					</div>

				</section>

				<section className={styles.main_sec}>
					<div className={styles.video_player}>

						<ReactPlayer
							url={videolink}
							controls
							width="100%"
							height="100%"
							//onReady={() => setLoading(false)}

							playing
						/>
					</div>
					<div className={styles.details}>
						<h2 className='title'>
							{title}
						</h2>
						<div className={styles.barz_clock}>

							<div className={`${level} ${styles.min_details}`}>
								<span>
									<span className="bar" />
									<span className="bar" />
									<span className="bar" />
									&nbsp;{level}
								</span>
								<span>
									&nbsp;&nbsp;&nbsp;
									<Icon id="clock" width={20} height={20} />
									&nbsp;9 mins
								</span>
							</div>
							<div>
								{categories.map((cat, i) => <LabelTag key={i} color={colors[i]}>{cat}</LabelTag>)}
							</div>
						</div>
						<div style={{ marginBottom: '50px' }}>
							<p className={styles.summary}>Summary of this video</p>
							<span>{description}</span>
						</div>
						<div style={{ width: '250px' }}>
							<p>
								Relevant links
							</p>
							<div className={styles.reference}>
								<a target="_blank" href='https://www.google.com' rel="noopener noreferrer">https://twitter.com/cci_lagos</a>
								<a target="_blank" href='/' rel="noopener noreferrer">https://twitter.com/cci_lagos</a>
								<a target="_blank" href='/' rel="noopener noreferrer">https://twitter.com/cci_lagos</a>
								<a target="_blank" href='/' rel="noopener noreferrer">https://twitter.com/cci_lagos</a>
							</div>
						</div>
					</div>

				</section>

			</div>

		</main>
	)
}

export default TakeCoursePage