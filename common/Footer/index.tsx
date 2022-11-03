import Button from 'common/Button';
import Icon from 'common/Icon';
import Input from 'common/Input';
import Logo from 'common/Logo';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={`app-pad ${styles.footer}`}>
      <div className={styles.left_div}>
        <div className={styles.logodiv}>
          <Logo />
        </div>
        <p>&copy; 2021 The Money Africa. All rights reserved.</p>
        <div className={styles.socials}>
          <Icon
            id="fb"
            width={32}
            height={32}
            onClick={() =>
              window.open(
                'https://web.facebook.com/groups/812950645554339?_rdc=1&_rdr',
              )
            }
          />
          <Icon
            id="linkdIn"
            width={32}
            height={32}
            onClick={() =>
              window.open(
                'https://www.linkedin.com/company/money-africa/?originalSubdomain=ng',
              )
            }
          />
          <Icon
            id="insta"
            width={32}
            height={32}
            onClick={() =>
              window.open('https://www.instagram.com/moneyafrica/')
            }
          />
          <Icon
            id="twitter"
            width={32}
            height={32}
            onClick={() => window.open('https://twitter.com/themoneyafrica')}
          />
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
          <Input
            field={{
              name: 'email',
              value: '',
              placeholder: '',
              type: 'email',
              label: 'Email Address',
              error: '',
            }}
            leftIcon={{ name: 'envelope' }}
          />
          <Button>Subscribe</Button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
