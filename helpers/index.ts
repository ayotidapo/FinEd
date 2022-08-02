import { IField } from 'common/Input';
import { IState } from 'useReducers/inputReducers';

export const isPasswordStrong = (value: string) =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/.test(value);

export const ValidateInput = (field: IField, inputsObj: IState) => {

  const { name, value, label, type,no_validate,required} = field;
  console.log(name, value, label, type,no_validate,required)
  const validatedInputs = { ...inputsObj };
  if (value?.trim()?.length < 1 && required) {
    validatedInputs[name].error = `${label || `Field`} is required `;
  } else if (type === 'email' && value) {
    const emailRegex = /^[a-zA-Z_0-9][-_a-zA-Z0-9.]*@[a-zA-Z]+\.[a-zA-Z]+/;
    if (!emailRegex.test(value))
      validatedInputs[name].error = `Invalid email address `;
    else validatedInputs[name].error = ``;
  } else if (name === 'password' || type === 'password') {
    if (value.length < 8)
      validatedInputs[name].error = 'Password must be atleast 6 characters';
    else if (!isPasswordStrong(value))
      validatedInputs[name].error =
        'use atleast a uppercase,lowercase,number and special character';
    else validatedInputs[name].error = '';
  } else if (name === 'password2' && value) {
    console.log('poo',inputsObj['password'].value || inputsObj['NewPassword'].value)
    validatedInputs[name].error =
      value !== (inputsObj['password'].value || inputsObj['NewPassword'].value ) ? 'Password does not match' : '';
  } 
  else {

    validatedInputs[name].error = ``;
    
  }
  if (no_validate) validatedInputs[name].error = ``;
  return validatedInputs;
};
