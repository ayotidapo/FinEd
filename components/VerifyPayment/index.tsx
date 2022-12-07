/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'helpers/axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'store';
import { updateUser } from 'reducers/user';
import { BtnLoader } from 'common/Button';
import Modal from 'common/Modal';
import styles from './verify.module.scss';

const VerifyPaymentPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<{ [key: string]: any } | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { transaction_id } = router.query;

  const verifyPayment = async (id: number) => {
    try {
      const response = await axios.post(
        `/subscriptions/verify-fwpayment/${id}`,
      );

      dispatch(updateUser(response?.data?.user));
      setLoading(false);
      setResponse(response?.data);
    } catch {
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    verifyPayment(Number(transaction_id));
  }, [transaction_id]);

  const onToggleModal = () => {
    // response?.payment?.status === "successful"
    if (response) router.push(`/courses`);
    else router.push(`/settings`);
    setIsOpen(false);
  };

  const onContinue = () => {
    router.push(`/courses`);
  };
  console.log(response);
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
            <p>
              You have successfully subscribed to{' '}
              <strong style={{ color: '#C03E21' }}>
                {response?.plan?.name}{' '}
              </strong>{' '}
              plan!
            </p>
            <span
              className="link hand"
              style={{ marginTop: '15px' }}
              onClick={onContinue}
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
