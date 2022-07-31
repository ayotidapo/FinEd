import Icon from 'common/Icon';
import styles from './label.module.scss';

interface LTProps {
  children?: React.ReactNode;
  className?: string;
  color?: string;
}

const LabelTag: React.FC<LTProps> = (props) => {
  const { children, color, className, ...rest } = props;

  return (
    <label
      style={{ background: color }}
      className={`elips ${styles.label} ${className}`}
      {...rest}
    >
      {children}
    </label>
  );
};
export default LabelTag;

interface LCProps extends LTProps {
  tag: string;
  value: string;
  type: 'checkbox' | 'radio';
  rname?: string;
  defaultChecked?: boolean
}

export const LabelCheck: React.FC<LCProps> = (props) => {
  const { children, rname, type, color, defaultChecked, tag, className, value, ...rest } =
    props;

  return (
    <span className={styles.label_check}>
      <input type={type} name={rname || tag} id={tag} value={value} defaultChecked={defaultChecked} /> &nbsp;
      <label
        htmlFor={tag}
        className={`${styles.label_check} ${className} hand elips`}
        {...rest}
      >
        {tag} {children}
        &nbsp;
        <Icon id="circle-mark" width={12} height={12} />
      </label>
    </span>
  );
};
