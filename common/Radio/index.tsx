import styles from './radio.module.scss';

interface Props {
  name: string;
  id: string;
  value: string | number;
  onChange: (e: any) => void;
  checked?: boolean;
}

const Radio: React.FC<Props> = (props) => {
  return (
    <span className={styles.radio}>
      <input
        type="radio"
        style={{ display: 'none' }}
        {...props}
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className={styles.radioLabel}></label>
    </span>
  );
};

export default Radio;
