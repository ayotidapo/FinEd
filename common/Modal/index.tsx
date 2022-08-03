import { useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './modal.module.scss'

interface Props {
	isBodyClose?: boolean;
	openModal: boolean;
	onToggle: (isOpen: boolean) => void;
	children: React.ReactNode;
	modalClass?: string;
	closeBtn?:boolean

}

const Modal: React.FC<Props> = (props) => {

	const { isBodyClose, openModal,closeBtn, onToggle, children, modalClass } = props

	return (
		<div className={cx(styles.modal_wrapper, { [styles.open_wrapper]: openModal })}
			onClick={isBodyClose ? () => onToggle(false) : undefined}
		>
			{closeBtn && <span className={styles.span} onClick={() => onToggle(false)}>&times;</span>}
			 <section className={`modal-width ${styles.modal_cont} ${modalClass}`} onClick={(e) => e.stopPropagation()}>
			<span className={styles.span} style={{color:'#000',borderColor:'#000'}} onClick={() => onToggle(false)}>&times;</span>
				{children}
			</section>

		</div >
	)
}

export default Modal