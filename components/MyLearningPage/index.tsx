import HeaderLoggedIn from 'common/HeaderLoggedIn';
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
        <div className={styles.lastviewed_details}></div>
      </main>
    </>
  );
};

export default MyLearningPage;
