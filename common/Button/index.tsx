import cx from 'classnames';
import styles from './button.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: any;
  loading?: boolean | undefined;
  bg?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const BtnLoader: React.FC<{ classStyle?: string }> = ({
  classStyle,
}) => <span className={`${styles.btn_loader}  ${classStyle} spin`} />;

const Button: React.FC<Props> = (props) => {
  const { bg, children, className, loading, style, ...rest } = props;
  return (
    <button
      style={{ background: bg && bg }}
      className={cx([styles.btn, className])}
      disabled={loading}
      {...rest}
    >
      {!loading ? children : <BtnLoader />}
    </button>
  );
};

export default Button;
