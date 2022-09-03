import Button from 'common/Button';
import Icon from 'common/Icon';
import { useSelector } from 'store';
import styles from '../ratereview.module.scss';

interface Props {
  closeModal: () => void;
  courseTitle: string;
  setShowQuiz: any;
}

const JustCompleteWtQuiz: React.FC<Props> = (props) => {
  const { closeModal, courseTitle } = props;

  const onStatrQuiz = () => {
    closeModal();
    props.setShowQuiz(true);
  };

  return (
    <section className={styles.completed}>
      <h2 className="title">Course Completed!</h2>
      <div className={`${styles.desc} ${styles.descqz}`}>
        <p>
          Way to go Thelma, you just completed all the videos in the{' '}
          <strong>{courseTitle}</strong>
          &nbsp;course. Please take a brief quiz to assist retain knowledge and
          enhance your confidence on this course before moving on to other
          courses.
        </p>
      </div>
      <div className={styles.btns_div_fe}>
        <Button bg="#C03E21" onClick={onStatrQuiz}>
          Take Quiz
          <Icon id="arrow-right" />
        </Button>
      </div>
    </section>
  );
};
export default JustCompleteWtQuiz;

interface IProps {
  onClickFn: (num: number) => void;
}

export const CompletedQuiz: React.FC<IProps> = ({ onClickFn }) => {
  const { user } = useSelector((state) => state.user);
  const highestText =
    'You did an outstanding job,indicating you have performed above average and we are proud of you. Now you have taken a step further to become more knowledgeable about your finance';
  const highText =
    'You have done well,Keep Learning to become more knowledgeable about your finance';
  const avergeText =
    'you performance is not bad but will advise you take a brief quiz to assist retain knowledge and enhance your confidence on this course before moving on to other courses.';
  const lowText =
    'which is kind of low,please take a brief quiz to assist retain knowledge and enhance your confidence on this course before moving on to other courses.';
  return (
    <section className={styles.completed}>
      <h2 className="title">Quiz Completed!</h2>

      <div className={`${styles.desc} ${styles.descq_zx}`}>
        <p>
          <strong>Weldone {user?.firstName}!</strong>
        </p>
        You scored 8 out of 10 {highestText}
      </div>
      <div className={styles.btns_div_fe}>
        {false && (
          <Button className="invrt-btn">&nbsp; View quiz answer</Button>
        )}
        <Button bg="#C03E21" onClick={() => onClickFn(2)}>
          Rate this course
          <Icon id="arrow-right" />
        </Button>
      </div>
    </section>
  );
};
