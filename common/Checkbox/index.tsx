interface Props {
  name: string;
  isChecked?: boolean;
  type: 'checkbox' | 'radio';
  value: string;
  onChange: (e: any) => void;
}

const Checkbox: React.FC<Props> = (props) => {
  const { name, value, isChecked, ...rest } = props;
  return (
    <label className={`hand checkbox `}>
      <input
        name={name}
        value={value}
        id={name}
        checked={isChecked}
        {...rest}
      />
      <span className="cbox" />
    </label>
  );
};
export default Checkbox;
