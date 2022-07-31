/* eslint-disable react-hooks/exhaustive-deps */

import inputReducer from 'useReducers/inputReducers';
import { useReducer, useEffect, useState } from 'react';
import { IState } from 'useReducers/inputReducers';
import { ValidateInput } from 'helpers';
import { IField } from 'common/Input';

const useForm = (fields: IState) => {
  const [inputs, inputDispatch] = useReducer(inputReducer, fields);
  const [isTouched, setIsTouched] = useState(false)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true)
    const { name, value } = e.target;

    inputDispatch({
      type: 'ON_INPUT_CHANGE',
      name,
      value,
    });
  };

  const getPayload = () => {
    const body: { [key: string]: any } = {};

    Object.keys(inputs).forEach((field) => {
      body[field] = inputs[field].value;
    });
    return body
  }

  const isError = () => Object.keys(inputs).some((field: string) => inputs[field].error)



  const onBlurInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const field = inputs[name];
    const validatedInputs = ValidateInput(field, inputs);
    inputDispatch({
      type: 'ON_UPDATE_INPUTS',
      validatedInputs,
    });
  };

  const setInputs = (newInputs: IState) => {

    inputDispatch({
      type: 'ON_UPDATE_INPUTS',
      validatedInputs: newInputs,
    });
  };



  return { isTouched, onChangeInput, onBlurInput, setInputs, getPayload, isError, inputs };
};

export default useForm;
