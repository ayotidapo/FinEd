import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Logo2 } from 'common/Logo';
import Input from 'common/Input';
import useForm from 'hooks/useForm';
import Icon from 'common/Icon';
import Image from 'next/image';
import styles from './signup.module.scss';
import Link from 'next/link';
import Button from 'common/Button';
import signUpFields, { initialState } from './fields';

interface Props { }

const SignUpPage: React.FC<Props> = () => {
  const { isTouched, onChangeInput, onBlurInput, getPayload, isError, inputs } = useForm(
    signUpFields,

  );
  console.log(123, isTouched)
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const body = getPayload();

      delete body.password2;
      delete body.nigeriaPhone;

      const res = await axios.post('/auth/signup', body);
      router.push('/email-verification')
    } catch (e) {
      setSubmitting(false);
    }
  };

  return (
    <div className={`signupWrapper ${styles.signup}`}>
      <main className={styles.wrapper}>
        <section className={styles.left}>
          <div className={styles.imgdiv}>
            <Logo2 />
          </div>
          <p>
            Money Africa is a subscription-based Education Technology (EdTech)
            platform providing access to free and paid financial education for
            learners.
          </p>
          <div className={styles.girl_div}>
            <Image src="/assets/girl.png" layout="fill" alt="girl" />
            <div className={styles.botm_div} />
          </div>
        </section>
        <section className={styles.right}>
          <div className={styles.formdiv}>
            <div className="center">
              <h2 className={`title ${styles.title}`}>Get Started</h2>
              <p>
                Start building your financial knowledge bank with our over 45+
                ready-made courses.
              </p>
            </div>

            <form className={styles.signupForm}>
              <div className={styles.split}>
                <Input
                  field={inputs.firstName}
                  leftIcon={{ name: 'user' }}
                  onChange={onChangeInput}
                  onBlur={onBlurInput}
                />
                <Input
                  field={inputs.lastName}
                  leftIcon={{ name: 'user' }}
                  onChange={onChangeInput}
                  onBlur={onBlurInput}
                />
              </div>

              <Input
                field={inputs.email}
                leftIcon={{ name: 'envelope' }}
                onChange={onChangeInput}
                onBlur={onBlurInput}
              />
              <div className={styles.split_phone}>
                <Input
                  field={inputs.nigeriaPhone}
                  leftIcon={{ name: 'phone' }}
                  rightIcon={{ name: 'caret-down', pos: [28, 72] }}
                  onChange={onChangeInput}
                  onBlur={onBlurInput}
                >
                  <Icon
                    id="nigeria"
                    width={24}
                    height={24}
                    className={styles.nigeria}
                  />
                </Input>
                <Input
                  field={inputs.phone}
                  inputClass={styles.phone}
                  onChange={onChangeInput}
                  onBlur={onBlurInput}
                >
                  <span className={styles.number}>+234</span>
                </Input>
              </div>
              <Input
                field={inputs.password}
                leftIcon={{ name: 'padlock' }}
                rightIcon={{ name: 'lock-password', pos: [18, '95%'] }}
                onChange={onChangeInput}
                onBlur={onBlurInput}
              />
              <Input
                field={inputs.password2}
                leftIcon={{ name: 'padlock' }}
                rightIcon={{ name: 'lock-password', pos: [18, '95%'] }}
                onChange={onChangeInput}
                onBlur={onBlurInput}
              />
              <Input
                field={inputs.refCode}
                leftIcon={{ name: 'hamper' }}
                onChange={onChangeInput}
                onBlur={onBlurInput}
              />
              <p className={styles.tnc}>
                By signing up, you agree to our{' '}
                <Link href="/reset-password">
                  <a className={styles.a}> Terms of Use</a>
                </Link>{' '}
                and{' '}
                <Link href="/forgot-password">
                  <a className={styles.a}>Privacy Policy.</a>
                </Link>
              </p>
              <div className={styles.sign_up}>
                <div>
                  <span>Already have an account?</span>
                  <Link href="/login">
                    <a className={styles.a}>Log In</a>
                  </Link>
                </div>
                <Button onClick={onSubmit} loading={submitting} disabled={isError() || !isTouched}>
                  Sign up <Icon id="arrow-right" width={20} height={20} />
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};
export default SignUpPage;
