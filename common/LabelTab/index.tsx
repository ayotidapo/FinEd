import classNames from 'classnames';
import Icon from 'common/Icon';
import styles from './labeltab.module.scss';

interface Props {
  tab: {
    text: string;
    icon: string;
  };
  onClick?: () => void;
  className?: string;
}

const LabelTab: React.FC<Props> = (props: Props) => {
  const { className, tab, ...rest } = props;
  const { text, icon } = tab;

  return (
    <li className={`hand ${styles.li_tab} ${className}`} {...rest}>
      <Icon id={icon} />
      <span>{text}</span>
    </li>
  );
};

export default LabelTab;
