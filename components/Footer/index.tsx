import Button from 'components/Button'
import Icon from 'components/Icon'
import Input from 'components/Input'
import Logo from 'components/Logo'
import styles from './footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.left_div}>
				<div className={styles.logodiv}>
					<Logo />
				</div>
				<p>&copy; 2021 The Money Africa. All rights reserved.</p>
				<div className={styles.socials}>
					<Icon id="fb" width={32} height={32} />
					<Icon id="linkdIn" width={32} height={32} />
					<Icon id="whatsapp" width={32} height={32} />
					<Icon id="twitter" width={32} height={32} />
				</div>
			</div>
			<div className={styles.mid_div}>
				<nav>
					<h4>SERVICES</h4>
					<ul>
						<li>MA Premium</li>
						<li>MA Learning platform</li>
						<li>MA kids</li>
						<li>MA Communities</li>
						<li>Digital Advisor</li>
					</ul>
				</nav>
				<nav>
					<h4>COMPANY</h4>
					<ul>
						<li>About Us</li>
						<li>Careers</li>
						<li>Contact Us</li>

					</ul>
				</nav>
				<nav>
					<h4>TOOLS</h4>
					<ul>
						<li>Calculator</li>
					</ul>
				</nav>

			</div>
			<div className={styles.right_div}>
				<h2 className={styles.title}>Sign up for the news letter</h2>
				<p>Sign up for our newsletter. Your email is never shared.</p>
				<form>
					<Input type="email" leftIcon={{ name: 'envelope', pos: [0, 10] }} required={true} />
					<Button>Subscribe</Button>
				</form>
			</div>
		</footer>
	)

}

export default Footer