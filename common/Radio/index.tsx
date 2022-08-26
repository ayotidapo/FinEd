import styles from './radio.module.scss';

interface Props {
  name: string;
  id: string;
  value: string | number;
}

const Radio: React.FC<Props> = (props) => {
  return (
    <span className={styles.radio}>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        style={{ display: 'none' }}
      />
      <label htmlFor={props.id} className={styles.radioLabel}></label>
    </span>
  );
};

export default Radio;
