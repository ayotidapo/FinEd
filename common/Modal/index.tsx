import { useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './modal.module.scss';
import { toast } from 'react-toastify';

interface Props {
  isBodyClose?: boolean;
  openModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalClass?: string;
  closeBtn?: boolean;
  zIndex?: string;
  dizabled?: boolean;
}

const Modal: React.FC<Props> = (props) => {
  const {
    isBodyClose,
    openModal,
    closeBtn,
    onClose,
    children,
    modalClass,
    zIndex,
    dizabled,
  } = props;

  return (
    <div
      className={cx(styles.modal_wrapper, { [styles.open_wrapper]: openModal })}
      onClick={isBodyClose ? () => onClose() : undefined}
      style={{ zIndex: zIndex || '99999' }}
    >
      {closeBtn && (
        <span className={styles.span} onClick={() => onClose}>
          &times;
        </span>
      )}
      <section
        className={`modal-width ${styles.modal_cont} ${modalClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {!dizabled && (
          <span
            className={styles.span}
            style={{ color: '#000', borderColor: '#000' }}
            onClick={() => onClose()}
          >
            &times;
          </span>
        )}
        {children}
      </section>
    </div>
  );
};

export default Modal;
