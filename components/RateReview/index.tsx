import Button from 'common/Button';
import Icon from 'common/Icon';
import Modal from 'common/Modal';
import styles from './ratereview.module.scss';
import WriteReview, { Rated } from './views/WriteReview';
import Rate from './views/Rate';
import LowRating from './views/LowRating';
import JustComplete from './views/JustComplete';
import { useState } from 'react';

interface Props {}

const RateReview: React.FC<Props> = () => {
  const [view, setView] = useState(1);
  const mClass = view === 1 ? styles.modalClass : styles.rt_modalClass;

  const onSetView = (view: number) => {
    setView(view);
  };

  return (
    <div className={styles.rate_review}>
      <Modal openModal onClose={() => null} modalClass={mClass}>
        {view === 1 && <JustComplete onClickFn={onSetView} />}
        {view === 2 && <Rate onClickFn={onSetView} />}
        {view === 3 && <LowRating />}
        {view === 4 && <WriteReview />}
        {view === 5 && <Rated />}
      </Modal>
    </div>
  );
};
export default RateReview;
