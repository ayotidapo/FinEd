/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Logo from 'common/Logo';
import Input from 'common/Input';
import Button from 'common/Button';
import pinFields, { initialState } from './fields';
import Icon from 'common/Icon';
import useForm from 'hooks/useForm';
// React.KeyboardEvent<HTMLInputElement>
import styles from './verify.module.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerificationPage = () => {
  const [id, setId] = useState('pin1');
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const { onChangeInput, setInputs, inputs } = useForm(pinFields);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e);
    const { name, value } = e.target;
    const idNum = Number(name.slice(-1));
    const newId = `pin${idNum + 1}`;
    if (idNum <= 6 && value) {
      setId(newId);
    }
  };

  const onInputKeyDown = (e: any) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const idNum = Number(id.slice(-1));

      const newId = `pin${idNum - 1}`;
      if (idNum > 1) setId(newId);
    }
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const body: { [key: string]: any } = {};
      let value = '';
      Object.keys(inputs).forEach((field) => {
        value += inputs[field].value;
      });

      body.token = value;
      const {
        data: { accessToken, user },
      } = await axios.post('/auth/verify-email', body);

      const nextApi = axios.create({
        baseURL: '/api',
      });

      await nextApi.post('/set-token', {
        token: accessToken,
        userId: user?.id,
      });

      router.push('/choose-plan');
    } catch {
      toast.error(`Email verification failed`);
      setSubmitting(false);
    }
  };

  const onResendCode = async () => {
    const { email } = router.query;
    if (!email) toast.error(`Could not find user email`);
    try {
      setSubmitting(true);
      await axios.post(`/auth/resend-verification`, { email });
      toast.success(`Code resent to ${email}`);
      setSubmitting(false);
    } catch {
      if (email) toast.error(`Code resent failed`);
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const inputF = { ...inputs };
    //	const query = router.query?.token || '';

    const query = '';
    const code = (query as string)?.split('');

    Object.keys(inputs).forEach((field, i) => {
      inputF[field].value = code[i];
    });

    setInputs(inputF);
  }, [router.query]);

  useEffect(() => {
    document.getElementById(`${id}`)?.focus();
  }, [id]);

  return (
    <main className={styles.email_verification}>
      <section className={styles.section}>
        <div
          className={`hand ${styles.go_back}`}
          onClick={() => router.push('/signup')}
        >
          &lt;&nbsp;&nbsp; Go back
        </div>
        <div className={styles.wrapper}>
          <div className={styles.logo_box}>
            <Logo />
          </div>
          <div className={styles.info}>
            <h3 className="title">Email Verification</h3>
            <p>
              Protecting your account is our top priority. A verification code
              has been sent to your email address. Please input the code below
              to complete your registration.
            </p>
            <div className={styles.inputs_div}>
              <Input
                field={inputs.pin1}
                onChange={onChange}
                onKeyDown={onInputKeyDown}
              />
              <Input
                field={inputs.pin2}
                onChange={onChange}
                onKeyDown={onInputKeyDown}
              />
              <Input
                field={inputs.pin3}
                onChange={onChange}
                onKeyDown={onInputKeyDown}
              />
              <Input
                field={inputs.pin4}
                onChange={onChange}
                onKeyDown={onInputKeyDown}
              />
              <Input
                field={inputs.pin5}
                onChange={onChange}
                onKeyDown={onInputKeyDown}
              />
              <Input
                field={inputs.pin6}
                onChange={onChange}
                onKeyDown={onInputKeyDown}
              />
            </div>
            <div className={styles.complete}>
              <p onClick={onResendCode}>
                Didn&apos;t receive code? <span className="hand">Resend</span>
              </p>
              <Button bg="#C03E21" onClick={onSubmit} loading={submitting}>
                Complete Sign up
                <Icon id="arrow-right" width={20} height={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmailVerificationPage;
