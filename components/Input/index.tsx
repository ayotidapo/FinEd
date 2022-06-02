
import React, { Children } from 'react';
import Icon from '../Icon';
import styles from './input.module.scss'



interface IconType {
	name: string;
	pos?: [number | string, number | string]
}
interface Props {
	inputClass?: string;
	children?: React.ReactNode;
	type: string;
	label?: string;
	leftIcon?: IconType;
	wrapperClass?: string;
	rightIcon?: IconType;
	placeholder?: string;
	required?: boolean;
	readOnly?: boolean
}

const Input: React.FC<Props> = (props) => {
	const { leftIcon, rightIcon, children, inputClass, wrapperClass, ...rest } = props


	const l = leftIcon as IconType
	const leftIname = l?.name
	const leftIpos = l?.pos || [28, 0]

	const r = rightIcon as IconType
	const rytIname = r?.name
	const rytIpos = r?.pos || [28, 0]

	return (
		<label className={`${styles.inputWrapper} ${wrapperClass}`}>
			<span className={styles.label}>{props.label}</span>
			{leftIcon && <span className='icon icon-left' style={{ top: leftIpos[0], left: leftIpos[1] }}>
				<Icon id={leftIname} width={24} height={24} />
			</span>
			}
			{rightIcon && <span className='icon icon-right hand' style={{ top: rytIpos[0], left: rytIpos[1] }}>
				<Icon id={rytIname} width={24} height={24} />
			</span>
			}
			{children}
			<input autoComplete="new-password" className={`${styles.input} ${inputClass}`}  {...rest} />
		</label>
	)
}

export default Input