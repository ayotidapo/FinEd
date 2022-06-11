import Input from 'common/Input'
import Icon from 'common/Icon'
import Logo from 'common/Logo'
import Button from 'common/Button'
import styles from './headerwtsearch.module.scss'

const HeaderWtSearch: React.FC = () => {
	return (
		<>
			<div className={`app-pad ${styles.header_sec}`}>
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

			{/* <Star /> */}
		</>
	)
}

export default HeaderWtSearch