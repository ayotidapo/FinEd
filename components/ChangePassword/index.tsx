import axios from 'axios';
import Button from 'common/Button';
import Icon from 'common/Icon';
import Input from 'common/Input';
import fields from './fields';
import styles from './changepassword.module.scss';
import useForm from 'hooks/useForm';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const { isTouched, onBlurInput, onChangeInput, getPayload, isError } =
    useForm(fields);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const body = getPayload();
      body.NewPassword = body.password;

      delete body.password;
      delete body.password2;

      const { data } = await axios.post(`/auth/change-password`, body);
      toast.success('Password changed');
      setSubmitting(false);
    } catch (e: any) {
      const errMsg = e?.response?.data?.message[0];
      toast.error(errMsg || 'Incorrect current password');
      setSubmitting(false);
    }
  };
  return (
    <section className={styles.changePassword}>
      <div className={styles.left}>
        <h3>Change Password</h3>
        <p>Change your password to a new one.</p>
      </div>
      <div className={styles.right}>
        <form>
          <Input
            field={fields.OldPassword}
            leftIcon={{ name: 'padlock', pos: [28, 0] }}
            rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
          <Input
            field={fields.password}
            leftIcon={{ name: 'padlock', pos: [28, 0] }}
            rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
          <Input
            field={fields.password2}
            leftIcon={{ name: 'padlock', pos: [28, 0] }}
            rightIcon={{ name: 'lock-password', pos: [28, '95%'] }}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
          <div className={styles.btn_con}>
            <Button
              bg="#C03E21"
              loading={submitting}
              onClick={onSubmit}
              disabled={isError() || !isTouched}
            >
              Change password
              <Icon id="arrow-right" width={20} height={20} />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default ChangePassword;
