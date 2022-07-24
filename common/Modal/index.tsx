import { useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './modal.module.scss'

interface Props {
	isBodyClose?: boolean;
	openModal: boolean;
	onToggle: (isOpen: boolean) => void;
	children: React.ReactNode;
	modalClass?: string;

}

const Modal: React.FC<Props> = (props) => {

	const { isBodyClose, openModal, onToggle, children, modalClass } = props

	return (
		<div className={cx(styles.modal_wrapper, { [styles.open_wrapper]: openModal })}
			onClick={isBodyClose ? () => onToggle(false) : undefined}
		>
			<span className={styles.span} onClick={() => onToggle(false)}>&times;</span>
			<section className={`${styles.modal_cont} ${modalClass}`} onClick={(e) => e.stopPropagation()}>
				{children}
			</section>

		</div >
	)
}

export default Modal