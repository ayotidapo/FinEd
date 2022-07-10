import styles from './checkbox.module.scss';

interface Props {
  name: string;
  isChecked?: boolean;
  type: 'checkbox' | 'radio',
  value: string
}

const Checkbox: React.FC<Props> = (props) => {
  const { name, value, isChecked, ...rest } = props;
  return (
    <label className={`hand ${styles.checkbox}`}>
      <input
        name={name}
        value={value}
        id={name}
        checked={isChecked}
        {...rest}
      />
      <span className={styles.cbox} />
    </label>
  );
};
export default Checkbox;
