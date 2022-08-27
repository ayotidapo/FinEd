import { IField } from 'common/Input';
import { IContent } from 'components/VideoDetails';
import contents from 'pages/contents';
import { IState } from 'useReducers/inputReducers';

export const isPasswordStrong = (value: string) =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/.test(value);

export const ValidateInput = (field: IField, inputsObj: IState) => {

  const { name, value, label, type,no_validate,required} = field;

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
  } else {

    validatedInputs[name].error = ``;
    
  }
  if (type==='password' && inputsObj['password2']?.value) { 

    validatedInputs['password2'].error =
      inputsObj['password2']?.value !== inputsObj['password']?.value  ? 'Password does not match' : '';
  }
  if (no_validate) validatedInputs[name].error = ``;
  return validatedInputs;
};


const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

export const formatDate =(dt:string)=>{
  const dateType=new Date(dt)
  const day=dateType.getUTCDay()
  const dd=day < 10 ? `0${day}` : day;
  const mm = months[(dateType.getUTCMonth()) + 1] 
  const yr=dateType.getUTCFullYear();
  return `${dd} ${mm} ${yr}`

}


export const getCourseProgressPerc=(totalVideos:number,numberWatched:number)=>{
  const courseProgressPerc = (numberWatched/totalVideos) * 100;
  if(totalVideos < 1) return 0;
  return courseProgressPerc;

}

export const isVideo = (type: string) => type.toLowerCase() === 'video';

export const ifHasVideo = (contents:IContent[])=>{
  return contents.some((content: IContent) => isVideo(content.type))
}

export const courseVideos = (contents:IContent[])=>{
  return contents.filter((content: IContent) => content.type?.toLowerCase() === 'video')
}

export function toTimeString(seconds:number) {

 const res=(new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)
 if(res) return res[0]
 return '00:00:00'

}

export const sortedAsc = (arr: any[], key: string) => {
  return arr.sort(
    (objA: any, objB: any) => Date.parse(objA[key]) - Date.parse(objB[key]),
  );
};

export const firstLetter = (name: string) => {
  return (name.slice(0,1)).toUpperCase()
};