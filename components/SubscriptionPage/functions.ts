import axios from 'axios';
import { setActivePlans } from 'reducers/plans';
import { AppDispatch } from 'store'

export const getActivePlans=() => async(dispatch:AppDispatch)=>{
	try {
		const  data  = await axios.get('/plans');
		console.log(data,930)
		dispatch(setActivePlans(data))
    return data;
	  } catch (e) {
      console.log(e);
	  }
}
