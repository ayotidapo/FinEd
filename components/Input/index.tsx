
import Icon from '../Icon';
import styles from './input.module.scss'



interface IconType {
	name: string;
	pos: [number | string, number | string]
}
interface Props {
	className?: string;
	type: string;
	label?: string;
	leftIcon?: IconType
	rightIcon?: IconType;
	placeholder?: string;
	required?: boolean
}

const Input: React.FC<Props> = (props) => {
	const { leftIcon, rightIcon, ...rest } = props


	const l = leftIcon as IconType
	const leftIname = l?.name
	const leftIpos = l?.pos

	const r = rightIcon as IconType
	const rytIname = r?.name
	const rytIpos = r?.pos

	return (
		<label className={styles.label}>
			{props.label}
			{leftIcon && <span className='icon-left' style={{ left: leftIpos[0], top: leftIpos[1] }}>
				<Icon id={leftIname} width={24} height={24} />
			</span>
			}
			{rightIcon && <span className='icon-right hand' style={{ left: rytIpos[0], top: rytIpos[1] }}>
				<Icon id={rytIname} width={24} height={24} />
			</span>
			}
			<input autoComplete="new-password" className={styles.input}  {...rest} />
		</label>
	)
}

export default Input