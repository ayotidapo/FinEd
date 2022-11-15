const fields = {
  username: {
    name: 'username',
    type: 'text',
    value: '',
    placeholder: '',
    label: 'Email Address',
    error: '',
    required: true,
  },

  password: {
    name: 'password',
    type: 'password',
    value: '',
    placeholder: '',
    label: 'Password',
    error: '',
    required: false,
  },
};

export const initialState = { ...fields };
export default fields;
