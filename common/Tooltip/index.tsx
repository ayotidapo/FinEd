import {  useState } from 'react';
import styles from './tooltip.module.scss'

interface Props{
    el:any;
    [key:string]:any
}

const Tooltip:React.FC<Props> = (props) => {
    const [txt,setTxt]=useState('Tap to copy')
    
    const { el,  children, className } = props;

    const onCopy = async () => {
      console.log(el)
		if (!navigator.clipboard) {
			console.log(78)
		  return;
		}
		try {

		   const text = el.innerText || '';	
		   console.log(text)	
			await navigator.clipboard.writeText(text);
		    setTxt('copied')
		 
		} catch (e) {
		 console.log(e)
		}
	  };
  
    return (
      <span className={styles.tool_tip_div} onClick={onCopy} onMouseEnter={() =>  setTxt('Tap to copy')}>
        {children}
        <span className={`${styles.tool__tip} f-12 ${className}`}>{txt}</span>
      </span>
    );
  };
  export default Tooltip;