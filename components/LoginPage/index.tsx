import Link from 'next/link';
import { useRouter } from 'next/router';
import useForm from 'hooks/useForm';
import Button from 'common/Button';
import Icon from 'common/Icon';
import Input from 'common/Input';
import LogInFields, { initialState } from './fields';
import Logo from 'common/Logo';
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();
  const { onChangeInput, onBlurInput, inputs } = useForm(
    LogInFields,
    initialState,
  );
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const body: { [key: string]: any } = {};

      Object.keys(inputs).forEach((field) => {
        body[field] = inputs[field].value;
      });


      const { data: { accessToken } } = await axios.post('/auth/login', body);

      const nextApi = axios.create({
        baseURL: '/api'
      })

      await nextApi.post('/set-token', { token: accessToken, username: body?.username })

      router.replace('/contents/videos')
    } catch (e) {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth_page">
      <section className="wrapper">
        <div className="topSection">
          <div className={`logo_div`}>
            <Logo />
          </div>
          <h2 className="title">Welcome back</h2>
          <p>
            Enter the same email and password you used to sign up to access
            accounts.
          </p>
        </div>
        <form style={{ marginTop: '20px' }}>
          <Input
            field={inputs.username}
            leftIcon={{ name: 'envelope', pos: [28, 0] }}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
          <Input
            field={inputs.password}
            leftIcon={{ name: 'padlock', pos: [28, 0] }}
            rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
        </form>
        <Link href="/forgot-password">
          <a className={`fg_pass hand`}>Forgot Password?</a>
        </Link>
        <div className="sign_up">
          <div>
            <span>Have no account yet?</span>
            <Link href="/signup">
              <a className="a">Sign Up</a>
            </Link>
          </div>
          <Button onClick={onSubmit} loading={submitting}>
            Login <Icon id="arrow-right" width={20} height={20} />
          </Button>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
