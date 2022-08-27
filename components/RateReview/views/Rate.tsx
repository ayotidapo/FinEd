import Button from 'common/Button';
import Icon from 'common/Icon';
import Ratings from 'common/Ratings';
import { useState } from 'react';
import styles from '../ratereview.module.scss';

interface Props {
  getUserRate: (userRate: number) => void;
  onSetView: (view: number) => void;
  userRate: number;
}

const Rate: React.FC<Props> = ({ onSetView, getUserRate, userRate }) => {
  const [error, setError] = useState('');

  const onChooseRate = () => {
    if (userRate < 1) return setError('Please choose a rating');
    if (userRate < 3) {
      onSetView(3);
      setError('');
      return;
    }
    onSetView(4);
    setError('');
  };

  return (
    <section className={styles.completed}>
      <h2 className="title">Rate this course</h2>
      <div>
        <Ratings rating={userRate} getUserRate={getUserRate} />
      </div>
      <div className="flx_jc_sb">
        <span>Very Bad</span>
        <span className="error">
          <strong>{userRate < 1 && error}</strong>
        </span>
        <span>Excellent</span>
      </div>
      <div className={styles.btns_div}>
        <Button bg="#C03E21" className={styles.rateBtn} onClick={onChooseRate}>
          Rate this course
          <Icon id="arrow-right" />
        </Button>
      </div>
    </section>
  );
};
export default Rate;
