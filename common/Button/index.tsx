import cx from 'classnames'
import style from './button.module.scss'

interface Props {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void

}

const Button: React.FC<Props> = (props) => {
	const { children, className, ...rest } = props
	return (
		<button className={cx([style.btn, className])} {...rest}>
			{children}
		</button>
	)
}

export default Button