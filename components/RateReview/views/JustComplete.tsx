import Button from 'common/Button';
import Icon from 'common/Icon';
import Link from 'next/link';
import styles from '../ratereview.module.scss';

const JustComplete = ({ onClickFn }: { onClickFn: (num: number) => void }) => {
  return (
    <section className={styles.completed}>
      <h2 className="title">Course Completed!</h2>
      <div className={styles.desc}>
        Please rate and review this course before moving on to other courses
      </div>
      <div className={styles.btns_div} style={{ justifyContent: 'center' }}>
        <Link href="/courses">
          <a>
            <Button className="invrt-btn">Continue</Button>
          </a>
        </Link>
        <Button bg="#C03E21" onClick={() => onClickFn(2)}>
          Rate this course
          <Icon id="arrow-right" />
        </Button>
      </div>
    </section>
  );
};
export default JustComplete;
