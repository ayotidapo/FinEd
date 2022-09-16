/* eslint-disable react/display-name */
import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import styles from './input.module.scss';

interface IconType {
  name: string;
  pos?: [number | string, number | string];
}

export interface IField {
  name: string;
  value: string;
  type: string;
  label: string;
  placeholder: string;
  [key: string]: string | number | {};
}

interface Props {
  leftIcon?: IconType;
  rightIcon?: IconType;
  children?: React.ReactNode;
  inputClass?: string;
  wrapperClass?: string;
  readOnly?: boolean | undefined;
  max?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  onKeyDown?: (e: any) => void | undefined;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  autoFocus?: boolean;
  field: IField;
}

const Input: React.FC<Props> = React.forwardRef((props, ref) => {
  const {
    leftIcon,
    rightIcon,
    children,
    inputClass,
    wrapperClass,
    field,
    onChange,
    ...rest
  } = props;
  const { label, value, name, error, ...fRest } = field || { error: '' };
  const [see, setSee] = useState(false);

  const l = leftIcon as IconType;
  const leftIname = l?.name;
  const leftIpos = l?.pos || [35, 0];

  const r = rightIcon as IconType;
  const rytIname = r?.name;
  const rytIpos = r?.pos || [35, 0];

  const onChangeAttr = (field: IField) => {
    const { name } = field;

    const lCase = name.toLowerCase();
    if (lCase.includes('password')) {
      setSee(!see);
      const el = document.getElementById(name);
      if (el?.getAttribute('type') === 'password')
        el?.setAttribute('type', 'text');
      else el?.setAttribute('type', 'password');
    }
  };

  return (
    <label
      className={cx([styles.inputWrapper, wrapperClass], {
        [styles.err_brd]: error,
      })}
    >
      <span className={styles.label}>
        {label}{' '}
        {field.required && name !== 'phone' && (
          <span style={{ color: 'red', fontSize: '1.8rem' }}>*</span>
        )}
      </span>
      {leftIcon && (
        <span
          className="icon icon-left"
          style={{ top: leftIpos[0], left: leftIpos[1] }}
        >
          <Icon id={leftIname} width={24} height={24} />
        </span>
      )}
      {rightIcon && (
        <span
          className="icon icon-right hand"
          style={{ top: rytIpos[0], left: rytIpos[1] }}
        >
          <Icon
            id={see ? 'open-eye' : rytIname}
            width={24}
            height={24}
            onClick={() => onChangeAttr(field)}
          />
        </span>
      )}
      {children}
      <input
        value={value}
        name={name}
        id={name}
        autoComplete="new-password"
        className={`${styles.input} ${inputClass}`}
        onChange={onChange ? (e) => onChange(e) : undefined}
        {...fRest}
        {...rest}
      />
      <div className={styles.errorDiv}>
        <span className="error">{`${error}`}</span>
      </div>
    </label>
  );
});

export default Input;

// const Input: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
