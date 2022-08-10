import styles from './ratings.module.scss';

const Star = ({ rating, id }: { rating: number; id: number }) => {
  return (
    <div className={styles.star_container} style={{ background: '#ccc' }}>
      <div
        className={id <= rating && rating !== 0 ? styles.star_glider : ''}
        style={{
          transform: `translateX(${(1 - 1) * -16.78}px)`, //.6
        }}
      />
    </div>
  );
};

export default Star;

//			transform: `translateX(${(1 - .45) * -16.78}px)`,
