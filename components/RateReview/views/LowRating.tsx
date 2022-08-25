import Button from 'common/Button';
import Checkbox from 'common/Checkbox';
import Icon from 'common/Icon';
import styles from '../ratereview.module.scss';

const LowRatings = () => {
  return (
    <section className={styles.lowrating}>
      <h2 className="title">Low rating feedback</h2>
      <p>
        We&apos;d want to know why you gave this course a low rating. Your
        feedback will help us
      </p>
      <div className={styles.fdbk_option}>
        <p>
          <Checkbox type="checkbox" name="feedback" value="Course was boring" />
          <span>Course was boring</span>
        </p>
        <p>
          <Checkbox
            type="checkbox"
            name="feedback"
            value="Tutor was not comprehensive"
          />
          <span>Tutor was not comprehensive</span>
        </p>
        <p>
          <Checkbox
            type="checkbox"
            name="feedback"
            value="Poor Course Quality"
          />
          <span>Poor Course Quality</span>
        </p>
        <p>
          <Checkbox
            type="checkbox"
            name="feedback"
            value="I didn’t learn anything new"
          />
          <span>I didn&apos;t learn anything new</span>
        </p>
        <p>
          <Checkbox
            type="checkbox"
            name="feedback"
            value="Ambiguous Course content"
          />
          <span>Ambiguous Course content</span>
        </p>
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
export default LowRatings;
