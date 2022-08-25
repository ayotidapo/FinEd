import Button from 'common/Button';
import Icon from 'common/Icon';
import styles from '../ratereview.module.scss';

const JustCompleteWtQuiz = () => {
  return (
    <section className={styles.completed}>
      <h2 className="title">Course Completed!</h2>
      <div className={`${styles.desc} ${styles.descqz}`}>
        Way to go Thelma, you just completed all the videos in the The Best
        Crypto Wallets for Binance Smart Chain (BSC) course. Please take a brief
        quiz to assist retain knowledge and enhance your confidence on this
        course before moving on to other courses.
      </div>
      <div className={styles.btns_div}>
        <Button bg="#C03E21">
          Take Quiz
          <Icon id="arrow-right" />
        </Button>
      </div>
    </section>
  );
};
export default JustCompleteWtQuiz;
