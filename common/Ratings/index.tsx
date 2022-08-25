import Star from 'common/Star';
import { useState } from 'react';
import styles from './ratings.module.scss';

interface Props {
  rating: number;
}

const Ratings: React.FC<Props> = ({ rating }) => {
  const ayraStars = Array.from(new Array(5).keys());
  const [rate, setRate] = useState(rating);
  const onSetRate = (num: number) => {
    setRate(num);
  };
  return (
    <div className={`${styles.ratings_gen} rating_div`}>
      {ayraStars.map((n, i) => (
        <Star key={n} id={i} rating={rate} onClick={onSetRate} />
      ))}
    </div>
  );
};

export default Ratings;
