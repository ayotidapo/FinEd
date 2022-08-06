import styles from './social.module.scss'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import Icon from "common/Icon";


const SocialMediaShare:React.FC<any>= ({iconSize}) => {

  return (
    <div className={styles.social}>
        <WhatsappShareButton  url='https://peing.net/ja/'>        
            <Icon  id="whatsapp" width={iconSize} height={iconSize}/>           
        </WhatsappShareButton>
        
        <FacebookShareButton  url='https://peing.net/ja/'>     
            <Icon id="fb" width={iconSize} height={iconSize}/>       
        </FacebookShareButton>      

        <TwitterShareButton  url='https://peing.net/ja/'>      
            <Icon  id="twitter" width={iconSize} height={iconSize}/>       
        </TwitterShareButton>

        <LinkedinShareButton   url='https://peing.net/ja/'>
          <Icon id="linkdIn" width={iconSize} height={iconSize}/>
        </LinkedinShareButton>
    </div>
  );
};

export default SocialMediaShare;