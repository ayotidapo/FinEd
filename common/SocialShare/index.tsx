import styles from './social.module.scss'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import Icon from "common/Icon";


const SocialMediaShare:React.FC<any>= () => {

  return (
    <div className={styles.social}>
        <WhatsappShareButton  url='https://peing.net/ja/'>        
            <Icon  id="whatsapp" />           
        </WhatsappShareButton>
        
        <FacebookShareButton  url='https://peing.net/ja/'>     
            <Icon id="fb" />       
        </FacebookShareButton>      

        <TwitterShareButton  url='https://peing.net/ja/'>      
            <Icon  id="twitter" />       
        </TwitterShareButton>

        <LinkedinShareButton   url='https://peing.net/ja/'>
          <Icon id="linkdIn" />
        </LinkedinShareButton>
    </div>
  );
};

export default SocialMediaShare;