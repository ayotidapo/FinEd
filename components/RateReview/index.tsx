import { useState } from 'react';
import axios from 'axios';
import Modal from 'common/Modal';
import styles from './ratereview.module.scss';
import WriteReview, { Rated } from './views/WriteReview';
import Rate from './views/Rate';
import LowRating from './views/LowRating';
import JustCompleteCourse from './views/JustComplete';
import JustCompleteQuizCourse, { CompletedQuiz } from './views/CompleteWtQuiz';
import { toast } from 'react-toastify';

interface Props {
  courseId: string;
  courseTitle: string;
  lastVideoEnd: boolean;
  setLastVideoEnd: any;
  hasQuiz: boolean;
  setShowQuiz: any;
  isQuizCompleted: boolean;
  score: number;
  totalQuestion: number;
}

const RateReview: React.FC<Props> = (props) => {
  const { isQuizCompleted, lastVideoEnd, setLastVideoEnd, hasQuiz } = props;
  const [view, setView] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userRate, setUserRate] = useState(0);
  const [wfeedback, setWfeedback] = useState('');
  const [feedback, setFeedback] = useState<string[]>([]);
  const mClass = view === 1 ? styles.modalClass : styles.rt_modalClass;

  const onSetView = (view: number) => {
    setView(view);
  };

  const onGetUserRate = (user_rate: number) => {
    setUserRate(user_rate);
  };

  const onChoose = (e: any) => {
    const { checked, value } = e.target;
    const fb = [...feedback];
    fb.push(`${value}`);

    if (checked) return setFeedback(fb);
    const newFeedback = fb.filter((reason) => reason !== value);
    setFeedback(newFeedback);
  };

  const onWriteReview = (e: any) => {
    setWfeedback(e.target.value);
  };

  const onSubmit = async () => {
    const fmessage = feedback.filter((msg) => msg !== 'others');
    const body = {
      courseId: props.courseId,
      rating: userRate,
      feedback: fmessage.join(',') + ',' + wfeedback,
    };
    try {
      setLoading(true);
      await axios.post('/ratings', body);
      setView(5);
      setLoading(false);
    } catch {
      toast.error('Review not submitted!');
      setView(2);
      setLoading(false);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setUserRate(0);
    setView(1);
    setLastVideoEnd(false);
  };

  const onNavigate = () => {
    if (view > 1) return setView(view - 1);
  };
  return (
    <div className={styles.rate_review}>
      <Modal
        openModal={isOpen || lastVideoEnd}
        modalClass={mClass}
        onClose={onClose}
        isBodyClose
        navigate={view > 1 && view < 5}
        onNavigate={onNavigate}
      >
        {view === 1 && !hasQuiz && <JustCompleteCourse onClickFn={onSetView} />}
        {view === 1 && hasQuiz && !isQuizCompleted && (
          <JustCompleteQuizCourse
            closeModal={onClose}
            courseTitle={props.courseTitle}
            setShowQuiz={props.setShowQuiz}
          />
        )}
        {view === 1 && hasQuiz && isQuizCompleted && (
          <CompletedQuiz
            onClickFn={onSetView}
            score={props.score}
            totalQuestion={props.totalQuestion}
          />
        )}
        {view === 2 && (
          <Rate
            onSetView={onSetView}
            userRate={userRate}
            getUserRate={onGetUserRate}
          />
        )}
        {view === 3 && (
          <LowRating
            loading={loading}
            onSubmit={onSubmit}
            onChoose={onChoose}
            onChange={onWriteReview}
            feedback={feedback}
          />
        )}
        {view === 4 && (
          <WriteReview
            onChange={onWriteReview}
            value={wfeedback}
            loading={loading}
            onSubmit={onSubmit}
          />
        )}
        {view === 5 && <Rated onClose={onClose} />}
      </Modal>
    </div>
  );
};
export default RateReview;
