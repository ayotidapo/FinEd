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
  const { user } = useSelector((state) => state?.user);
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
          Way to go {user?.firstName}, you just completed all the videos in the{' '}
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
  score: number;
  totalQuestion: number;
}

export const CompletedQuiz: React.FC<IProps> = (props) => {
  const { onClickFn, score, totalQuestion } = props;
  const { user } = useSelector((state) => state.user);
  const percScore = (100 * score) / totalQuestion;
  let remark = `which is ${percScore}%`;

  switch (true) {
    case percScore <= 50:
      remark =
        'which is kind of low,please take a brief quiz to retain knowledge and enhance your confidence on this course before moving on to other courses.';
      break;
    case percScore > 50 && percScore < 70:
      remark =
        'you performance is not bad but will advise you take a brief quiz to assist retain knowledge and enhance your confidence on this course before moving on to other courses.';
      break;
    case percScore > 70 && percScore < 100:
      remark =
        'You have done well,even though you can still do better keep Learning to become more knowledgeable about this course';
      break;
    default:
      remark =
        'You did an outstanding job,indicating you have performed above average and we are proud of you. Now you have taken a step further to become more knowledgeable about your finance';
  }

  return (
    <section className={styles.completed}>
      <h2 className="title">Quiz Completed!</h2>

      <div className={`${styles.desc} ${styles.descq_zx}`}>
        <p>
          <strong>Weldone {user?.firstName}!</strong>
        </p>
        You scored {score} out of {totalQuestion} {remark}
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
