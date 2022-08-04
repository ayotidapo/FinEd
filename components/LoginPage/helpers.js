import axios from 'axios';
import { setUser } from 'reducers/user';
import { toast } from 'react-toastify';

export const loginUser = (body) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', body);
    toast.success('Login successful')
    const { accessToken, user } = data;

    const nextApi = axios.create({
      baseURL: '/api',
    });

    await nextApi.post('/set-token', {
      token: accessToken,
      userId: user?.id,
    });

    dispatch(setUser(data));
  } catch (e) {
    console.log(e.response)
    toast.error(e?.response?.data?.messsage || 'Login failed')
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/auth/profile`);


    dispatch(setUser({ user: data }));
  } catch (e) {}
};
