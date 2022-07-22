import axios from 'axios';
import { setActivePlans } from 'reducers/plan';
import { AppDispatch } from 'store'

export const getActivePlans=() => async(dispatch:AppDispatch)=>{
	try {
		const { data } = await axios.get('/plans');
		dispatch(setActivePlans({plans:data}))
    return data;
	  } catch (e) {
      console.log(e);
	  }
}
