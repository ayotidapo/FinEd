import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Header, { MobileHeader } from 'common/Header';
import useSetNav from 'hooks/useSetNav';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Icon from 'common/Icon';
import Footer from 'common/Footer';
import Button from '../common/Button';
import axios from 'helpers/axios';
import { getCookie } from 'cookies-next';
import { getToken } from 'helpers/getToken';

const Home: NextPage = () => {
  const { open, onSetNav } = useSetNav();

  return (
    <div style={{ overflow: 'hidden' }}>
      <Header setNav={onSetNav} />
      {open && <MobileHeader toOpen={open} setNav={onSetNav} />}
      <main className={styles.main}>
        <div className="app-pad">
          <section className={styles.top_sec}>
            <div className={styles.left_div}>
              <h2 className="title">Improve your financial health.</h2>
              <p>
                MoneyAfrica is a subscription-based Ed-tech platform providing
                access to free and paid financial knowledge for learners.
              </p>
              <div className={styles.btns_div}>
                <Button>Our Service</Button>
                <Button>Start Investing</Button>
              </div>
            </div>
            <div className={styles.right_div}>
              <Image
                src="/assets/top-sec.png"
                layout="fill"
                alt="top-sec-img"
              />
            </div>
          </section>
          <section className={styles.featured}>
            <span>As featured on</span>
            <div className={styles.img_bx}>
              <div>
                <Image src="/assets/bbc.png" layout="fill" alt="top-sec-img" />
              </div>
              <div>
                <Image
                  src="/assets/techpoint.png"
                  layout="fill"
                  alt="top-sec-img"
                />
              </div>
              <div>
                <Image src="/assets/cnn.png" layout="fill" alt="top-sec-img" />
              </div>
              <div>
                <Image src="/assets/lnk.png" layout="fill" alt="top-sec-img" />
              </div>
            </div>
          </section>
        </div>
        <section className={`app-pad ${styles.welcome_div}`}>
          <div>
            <h2 className="title"> Welcome to MoneyAfrica</h2>
            <p>
              Here’s an introductory message from Tosin Olaseinde, CEO
              MoneyAfrica on why you should hop on this ride with us.
            </p>
            <div className={styles.btns_div}>
              <Button>Watch Video</Button>
              <Button>Read article</Button>
            </div>
          </div>
          <div className={styles.video_div}>
            <iframe src="https://www.youtube.com/embed/mfVpN0pblrs"></iframe>
          </div>
        </section>
        <section className={styles.explore}>
          <div className={styles.explore_txt}>
            <h2 className="title">
              Explore a variety of powerful financial tools packaged for you.
            </h2>
            <p>
              We have amazing services that can aid you through your journey to
              making better financial decisions and becoming an expert at money
              management.
            </p>
          </div>
        </section>
        <section className={styles.options}>
          <article>
            <div>
              <h2 className="title">Premium </h2>
              <p>
                Talk to financial advisers, access powerful resources to support
                your financial goals.
              </p>
            </div>
            <div className={styles.img_opt_box}>
              <Image
                src="/assets/premium.svg"
                layout="fill"
                alt="top-sec-img"
              />
            </div>
            <Button className={styles.optbtn}>
              Become a partner
              <Icon id="arrow-right" width={20} height={20} />
            </Button>
          </article>
          <article>
            <h2 className="title">Learn </h2>
            <p>
              Talk to financial advisers, access powerful resources to support
              your financial goals.
            </p>
            <div className={styles.img_opt_box}>
              <Image src="/assets/learn.svg" layout="fill" alt="top-sec-img" />
            </div>
            <Button className={styles.optbtn}>
              Start learning
              <Icon id="arrow-right" width={20} height={20} />
            </Button>
          </article>
          <article>
            <h2 className="title">Communities </h2>
            <p>
              Have access to powerful resources, investment tips and real-time
              support.
            </p>
            <div className={styles.img_opt_box}>
              <Image
                src="/assets/communities.svg"
                layout="fill"
                alt="top-sec-img"
              />
            </div>
            <Button className={styles.optbtn}>
              Join our community
              <Icon id="arrow-right" width={20} height={20} />
            </Button>
          </article>
          <article>
            <h2 className="title">Kids</h2>
            <p>
              Financial Education Made Easy for Kids. We run boot camps that
              help kids acquire financial literacy skills in a fun way.
            </p>
            <div className={styles.img_opt_box}>
              <Image src="/assets/kids.svg" layout="fill" alt="top-sec-img" />
            </div>
            <Button className={styles.optbtn}>
              Register your kids
              <Icon id="arrow-right" width={20} height={20} />
            </Button>
          </article>
          <div className={styles.learnMore}>
            <div>
              <h2 className="title">Automated Digital Advisory</h2>
              <p>
                Improve your financial health and investment strategy by
                answering a few questions we’ll ask you.
              </p>
              <Button className={styles.optbtn}>
                Learn More
                <Icon id="arrow-right" width={20} height={20} />
              </Button>
            </div>
            <div className={styles.wallet_div}>
              <Image src="/assets/wallet.png" layout="fill" alt="top-sec-img" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
//
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const c_token = getCookie('c_token', { req, res });

  const { s_token, userId } = getToken(c_token as string);

  axios.defaults.headers.common['Authorization'] = `Bearer ${s_token}`;

  if (userId) {
    return {
      redirect: {
        destination: '/courses',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
