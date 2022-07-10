import { IField } from 'common/Input';

export interface IState {
  [key: string]: IField;
}

interface IAction {
  type: string;
  [key: string]: any;
}

const inputReducer = (state: IState, action: IAction) => {

  switch (action.type) {

    case 'ON_INPUT_CHANGE':
      return { ...onInputChangeFunc(state, action) };
      case 'ON_UPDATE_INPUTS':
        return { ...action.validatedInputs };
        case 'RESET':
          return { ...action.initialState };
    default:
      return state;
  }
};

export default inputReducer;

const onInputChangeFunc = (state: IState, action: IAction) => {
  const { name, value } = action
  const State = { ...state };
  State[name].value = value;

  return State;
};


