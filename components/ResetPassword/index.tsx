import { useRouter } from 'next/router';
import Button from 'common/Button';
import Icon from 'common/Icon';
import Input from 'common/Input';
import resetFields from './fields';
import Logo from 'common/Logo';
import useForm from 'hooks/useForm';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const router = useRouter();
  const token = router.query?.token || '';

  const { onChangeInput, onBlurInput, inputs } = useForm(resetFields);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error('Invalid reset password link, try again!');
      router.push('/forgot-password');
    }
    try {
      setSubmitting(true);
      const body: { [key: string]: any } = {};

      Object.keys(inputs).forEach((field) => {
        body[field] = inputs[field].value;
      });
      delete body.password2;
      body.token = token;

      const res = await axios.post('/auth/reset-password', body);
      toast.success('Password reset successful');
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
      if (token) toast.error('Password reset failed');
    }
  };

  return (
    <main className={`auth_page`}>
      <section className={`wrapper`}>
        <div className={`topSection`}>
          <div className="logo_div">
            <Logo />
          </div>
          <h2 className="title">Reset password</h2>
          <p>Enter your new password for your account.</p>
        </div>
        <form style={{ marginTop: '20px' }}>
          <Input
            field={inputs.password}
            leftIcon={{ name: 'padlock', pos: [35, 0] }}
            rightIcon={{ name: 'lock-password', pos: [35, '95%'] }}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
          <Input
            field={inputs.password2}
            leftIcon={{ name: 'padlock', pos: [35, 0] }}
            rightIcon={{ name: 'lock-password', pos: [35, '95%'] }}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
        </form>
        <div className={`sign_up`}>
          <Button onClick={onSubmit} loading={submitting}>
            Reset password <Icon id="arrow-right" width={20} height={20} />
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordPage;
