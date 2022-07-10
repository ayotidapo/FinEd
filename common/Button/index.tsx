import cx from 'classnames';
import style from './button.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  loading?: boolean | undefined
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const BtnLoader: React.FC = () => <span className={`${style.btn_loader} spin`} />


const Button: React.FC<Props> = (props) => {
  const { children, className, loading, ...rest } = props;
  return (
    <button className={cx([style.btn, className])} disabled={loading} {...rest}>
      {!loading ? children : <BtnLoader />}
    </button>
  );
};

export default Button;
