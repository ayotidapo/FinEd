import Icon from 'common/Icon';
import styles from './select.module.scss';
interface Props {
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  icon?: string;
  error?: string;
  optionSelected: string;
  onChange: (e: any) => void;
}

const Select: React.FC<Props> = (props: Props) => {
  const { options, name, icon, error, optionSelected, ...rest } = props;
  console.log(optionSelected, 'optionSelected');
  return (
    <label className={styles.select_wrapper}>
      <span>Country of Residence</span>
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          marginBottom: '5px',
        }}
      >
        <Icon id="house" />
        <select name={name} {...rest} defaultValue={optionSelected}>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <small className="error">{error}</small>
    </label>
  );
};
export default Select;
