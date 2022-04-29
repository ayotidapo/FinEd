
import Link from 'next/link';
import Button from 'components/Button'
import Logo from 'components/Logo'
import styles from './header.module.scss';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
	const router = useRouter()
	return (
		<header className={styles.header}>
			<div className={styles.logo_box}>
				<Logo />
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
				<Button onClick={() => router.push('/signup')}>Get Started</Button>
				<Button>Financial Health Check</Button>
			</div>
		</header>
	)
}

export default Header