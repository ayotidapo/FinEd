import Icon from 'common/Icon';
import Image from 'next/image';
import Logo from 'common/Logo';
import styles from './headerloggedIn.module.scss'
import Button from 'common/Button';

const Header = () => {
	return (
		<header className={`app-pad ${styles.header}`}>
			<div className={styles.logo_box}>
				<Logo />
			</div>
			<nav className={`navi ${styles.navi_box}`}>
				<ul className={styles.nav_ul}>
					<li>Explore</li>
					<li>Article</li>
					<li>Videos</li>
					<li>Calculator</li>
					<li>My Learning</li>
				</ul>
			</nav>
			<div className={styles.avatar_div}>
				<Button className={styles.upgrade}>UPGRADE</Button>
				<Icon id="book-mark" />
				<Icon id="bell" />
				<div className={`hand ${styles.log_auth}`}>
					<span className={styles.avatar}>
						<Image src="/assets/girl.png" layout="fill" alt="top-sec-img" />
					</span>
					<Icon id="caret-down" />
				</div>
			</div>
		</header>
	)
}
export default Header