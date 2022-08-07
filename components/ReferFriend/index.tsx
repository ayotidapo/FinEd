import Button from 'common/Button';
import Icon from 'common/Icon';
import Tooltip from 'common/Tooltip';
import SocialMediaShare from 'common/SocialShare';
import { useEffect, useState } from 'react';
import { useSelector } from 'store';
import styles from './referfriend.module.scss';

const ReferFriend = () => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [el2, setEl2] = useState<HTMLElement | null>(null);
  const { user } = useSelector((state) => state?.user?.user);
  const browsUrl = window.location.origin;
  const { refCode } = user;

  useEffect(() => {
    setEl(document.getElementById('codeSpan'));
    setEl2(document.getElementById('codeSpan2'));
  }, []);

  return (
    <section className={styles.refer_friend}>
      <div className={styles.left}>
        <h3>
          {' '}
          Refer a friend to get{' '}
          <span style={{ color: '#C03E21' }}>10% off</span> your next
          subscription
        </h3>
        <p>
          When you refer a friend, they need to become paid subscribers for this
          offer to be valid.
        </p>
      </div>
      <div className={styles.right}>
        <article className={styles.art}>
          <div>
            <h3>Total no. referred</h3>
            <h2 className="title">0</h2>
          </div>
          <div>
            <h3>Total paid subscribers</h3>
            <h2 className="title">0</h2>
          </div>
          <div>
            <h3>Total amount gotten</h3>
            <h2 className="title">N0,000.00</h2>
          </div>
        </article>
        <p>
          <strong> Note:</strong> You will be contacted by a member of our
          support team at the end of the month to receive your referral bonus.
        </p>

        <div className={styles.ref_code_box}>
          <span>Your referral code:</span>
          <div className={styles.link}>
            <h3 className="title">
              <span id="codeSpan">{refCode}</span>
              <span id="codeSpan2" style={{ display: 'none' }}>
                {`${browsUrl}/signup?referrer=${refCode}`}
              </span>
              <Tooltip el={el2}>
                <Button>Copy referral link</Button>
              </Tooltip>
            </h3>
          </div>
          <div className="flx_jc_sb">
            <Tooltip el={el}>
              <Icon id="copy" className="hand" />
              &nbsp;
              <span className="hand">Copy code</span>
            </Tooltip>

            <SocialMediaShare />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ReferFriend;

// <h3 className='title' >
// 							 <span id='codelink'>{refCode}</span>
// 							 <Tooltip el={el2}>
// 							   <Button>
// 								  <span>htt</span>
// 								  Copy referral link
// 								</Button>
// 							</Tooltip>
// 						</h3>
