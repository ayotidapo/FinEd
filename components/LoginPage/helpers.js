import axios from 'axios';
import { setUser } from 'reducers/user';
import { setPlans } from 'reducers/plans';
import { toast } from 'react-toastify';

export const loginUser = (body) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', body);
    toast.success('Login successful');
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
    toast.error(e?.response?.data?.messsage || 'Login failed');
  }
};

export const getPlans = () => async (dispatch) => {
  try {
    const { data: plans } = await axios.get('/plans/noauth');

    dispatch(setPlans(plans));
  } catch (e) {}
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data: datap } = await axios.get(`/auth/profile`);
    await dispatch(setUser({ user: datap }));

    await dispatch(getPlans());
  } catch (e) {}
};
