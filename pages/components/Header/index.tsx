import Image from 'next/image';
import Link from 'next/link';
import Button from 'pages/components/Button'
import styles from './header.module.scss';

const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo_box}>
				<Image src="/assets/logo.png" layout='fill' alt="logo" />
			</div>
			<nav className={styles.header_nav}>
				<ul className={styles.header_ul}>
					<li>Services</li>
					<li>Tools</li>
					<li>Company</li>
					<li>Explore</li>
					<li><Link href="/login">Login</Link></li>
				</ul>
			</nav>
			<div className={styles.header_btn_div}>
				<Button className="">Get Started</Button>
				<Button>Financial Health Check</Button>
			</div>
		</header>
	)
}

export default Header