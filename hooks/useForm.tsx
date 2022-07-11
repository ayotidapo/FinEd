/* eslint-disable react-hooks/exhaustive-deps */

import inputReducer from 'useReducers/inputReducers';
import { useReducer, useEffect } from 'react';
import { IState } from 'useReducers/inputReducers';
import { ValidateInput } from 'helpers';

const useForm = (fields: IState, initialState: IState) => {
  const [inputs, inputDispatch] = useReducer(inputReducer, fields);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    inputDispatch({
      type: 'ON_INPUT_CHANGE',
      name,
      value,
    });
  };

  const onBlurInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const field = inputs[name];
    const validatedInputs = ValidateInput(field, inputs);
    inputDispatch({
      type: 'ON_UPDATE_INPUTS',
      validatedInputs,
    });
  };

  return { onChangeInput, onBlurInput, inputs };
};

export default useForm;
