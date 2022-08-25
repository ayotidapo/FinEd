interface Props {
  rating: number;
  id: number;
  onClick?: (num: number) => void;
}

const Star: React.FC<Props> = ({ rating, id, onClick }) => {
  return (
    <div
      className="star_container"
      style={{ background: '#ccc' }}
      onClick={onClick ? () => onClick(id) : () => null}
    >
      <div
        className={id < rating && rating !== 0 ? 'star_glider' : ''}
        style={{
          transform: `translateX(${(1 - 1) * -16.78}px)`, //.6
        }}
      />
    </div>
  );
};

export default Star;

//			transform: `translateX(${(1 - .45) * -16.78}px)`,
