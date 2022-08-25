import Button from 'common/Button';
import Icon from 'common/Icon';
import Ratings from 'common/Ratings';
import styles from '../ratereview.module.scss';

const Rate = () => {
  return (
    <section className={styles.completed}>
      <h2 className="title">Rate this course</h2>
      <div>
        <Ratings rating={4} />
      </div>
      <div className="flx_jc_sb">
        <span>Very Bad</span>
        <span>Excellent</span>
      </div>
      <div className={styles.btns_div}>
        <Button bg="#C03E21" className={styles.rateBtn}>
          Rate this course
          <Icon id="arrow-right" />
        </Button>
      </div>
    </section>
  );
};
export default Rate;
