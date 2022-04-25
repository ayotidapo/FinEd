import cx from 'classnames'
import style from './button.module.scss'

interface Props {
	children: React.ReactNode;
	className?: string;

}

const Button: React.FC<Props> = (props) => {
	const { children, className } = props
	return (
		<button className={cx([style.btn, className])}>
			{children}
		</button>
	)
}

export default Button