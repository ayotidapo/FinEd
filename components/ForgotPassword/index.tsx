import Link from 'next/link';
import Button from 'common/Button';
import useForm from 'hooks/useForm';
import Icon from 'common/Icon';
import Input from 'common/Input';
import styles from './forgot.module.scss';
import forgotPasswordFields from './fields';
import Logo from 'common/Logo';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPwPage = () => {
  const { onChangeInput, onBlurInput, inputs } = useForm(forgotPasswordFields);

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const body: { [key: string]: any } = {};

      Object.keys(inputs).forEach((field) => {
        body[field] = inputs[field].value;
      });

      const res = await axios.post('/auth/forgot-password', body);
      toast.success('Reset link sent to email');
      setSubmitting(false);
    } catch (e) {
      toast.success('Reset link not sent to email');
      setSubmitting(false);
    }
  };
  return (
    <main className={`auth_page`}>
      <section className="wrapper">
        <div className="topSection">
          <div className="logo_div">
            <Logo />
          </div>
          <h2 className="title">Forgot Password</h2>
          <p>
            Please provide the email address you used when you signed up for
            your MoneyAfrica account.
          </p>
        </div>
        <form style={{ marginTop: '20px' }}>
          <Input
            field={inputs.email}
            leftIcon={{ name: 'envelope', pos: [35, 0] }}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
        </form>
        <div className="sign_up">
          <div>
            <span>Remember Password?</span>
            <Link href="/login">
              <a className="a">Log In</a>
            </Link>
          </div>
          <Button
            className={styles.resent_btn}
            onClick={onSubmit}
            loading={submitting}
          >
            <>
              Send reset link
              <Icon id="arrow-right" width={20} height={20} />
            </>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ForgotPwPage;
