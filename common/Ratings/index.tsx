import Star from 'common/Star';
import { useState } from 'react';
import styles from './ratings.module.scss';

interface Props {
  rating: number;
  getUserRate: (x: number) => void;
}

const Ratings: React.FC<Props> = ({ rating, getUserRate }) => {
  const ayraStars = Array.from(new Array(5).keys());
  const [rate, setRate] = useState(rating);

  const onSetRate = (num: number) => {
    setRate(num);
    getUserRate(num);
  };

  return (
    <div className={`${styles.ratings_gen} rating_div`}>
      {ayraStars.map((n, i) => (
        <Star key={n} id={i} rating={rate} onClick={() => onSetRate(i + 1)} />
      ))}
    </div>
  );
};

export default Ratings;
