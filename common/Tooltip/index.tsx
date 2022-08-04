import styles from './tooltip.module.scss'

interface Props{
    [key:string]:any
}

const Tooltip:React.FC<Props> = (props) => {
    const { desc, children, className } = props;
  
    return (
      <span className={styles.tool_tip_div}>
        {children}
        <span className={`${styles.tool__tip} f-12 ${className}`}>{desc}</span>
      </span>
    );
  };
  export default Tooltip;