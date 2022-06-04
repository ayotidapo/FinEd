import classNames from 'classnames';
import styles from './label.module.scss'

interface Props {
	children?: React.ReactNode;
	className?: string;
	color?: string

}

const LabelTag: React.FC<Props> = (props) => {
	const { children, color, className, ...rest } = props
	return (
		<label style={{ background: color }} className={`${styles.label} ${className}`} {...rest} >
			{children}
		</label>
	)
}
export default LabelTag