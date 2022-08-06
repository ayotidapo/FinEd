import HeaderLoggedIn from 'common/HeaderLoggedIn';
import Icon from 'common/Icon';
import Image from 'next/image';
import styles from './learning.module.scss';
const MyLearningPage = () => {
  return (
    <>
      <div className={styles.topheader}>
        <HeaderLoggedIn />
        <section>
          <h2 className="title">My Learning</h2>
          <nav className={`navi ${styles.navUl}`}>
            <ul className={styles.uli}>
              <li>Ongoing</li>
              <li>Bookmarked</li>
              <li>Completed</li>
            </ul>
          </nav>
        </section>
      </div>
      <main className={styles.main}>
        <h2 className="title">Last viewed</h2>
        <section className={styles.lastviewed_details}>
          <div className={styles.imgBx}>
            <Image src="/assets/bag.png" layout="fill" alt="" />
            <span>
              <Icon id="play" />
            </span>
            <div className={styles.overlay} />
          </div>
          <div className={styles.midBx}></div>
          <div className={styles.lblBx}></div>
        </section>
      </main>
    </>
  );
};

export default MyLearningPage;
