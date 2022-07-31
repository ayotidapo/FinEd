const fields = {
	OldPassword: {
	  name: 'OldPassword',
	  type: 'password',
	  value: '',
	  placeholder: 'Enter Current Password',
	  label: 'Current Password',
	  error: '',
	  required: true,
	},
	password: {
	  name: 'password',
	  type: 'password',
	  value: '',
	  placeholder: 'Enter New Password',
	  label: 'New Password',
	  error: '',
	  required: true,
	},
	password2: {
		name: 'password2',
		type: 'password',
		value: '',
		placeholder: 'Re-type New Password',
		label: 'Confirm Password',
		error: '',
		required: true,
	  },
  };
  
  export default fields;
  