import Modal from 'common/Modal';
import styles from './verify.module.scss';
import { useEffect, useState } from 'react';
import { BtnLoader } from 'common/Button';
import axios from 'axios';
import { Router, useRouter } from 'next/router';

const VerifyPaymentPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<{ [key: string]: any } | null>(null);
  const router = useRouter();
  const { transaction_id } = router.query;

  const verifyPayment = (id: number) => {
    try {
      const response = axios.post(`/subscriptions/verify/${id}`);
      setLoading(false);
      return response;
    } catch {
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    const res = verifyPayment(Number(transaction_id));
    setResponse(res);
  }, [transaction_id]);

  const onToggleModal = () => {
    // response?.payment?.status === "successful"
    if (response) router.push(`/courses`);
    else router.push(`/settings`);
    setIsOpen(false);
  };

  return (
    <Modal
      openModal={isOpen}
      onClose={onToggleModal}
      modalClass={styles.modalClass}
    >
      <div className={styles.status}>
        {loading && (
          <BtnLoader classStyle={`${styles.codeloading} abs-center`} />
        )}

        {!loading && response && (
          <>
            <h3 className="title" style={{ color: '#015351' }}>
              Payment Successful
            </h3>
            <p>You have successfully subscribed to {response?.plan?.name} </p>
            <span
              className="link hand"
              style={{ marginTop: '15px' }}
              onClick={() => router.push(`/courses`)}
            >
              OK, continue
            </span>
          </>
        )}
        {!loading && !response && (
          <>
            <h3 className="title" style={{ color: '#C03E21' }}>
              Payment Failed
            </h3>
            <p>You subscription plan was not successful </p>
            <span className="link hand" style={{ marginTop: '15px' }}>
              Try again
            </span>
          </>
        )}
      </div>
    </Modal>
  );
};

export default VerifyPaymentPage;

//response?.payment?.status === "successful"
