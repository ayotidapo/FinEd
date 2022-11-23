import axios from 'helpers/axios';
import Button from 'common/Button';
import Icon from 'common/Icon';
import Tooltip from 'common/Tooltip';
import PageLoader from 'common/PageLoader';
import SocialMediaShare from 'common/SocialShare';
import { useEffect, useState } from 'react';
import { useSelector } from 'store';
import styles from './referfriend.module.scss';

interface UserSummary {
  totalReferred: number;
  totalPaid: number;
  amountGotten: number;
}

const ReferFriend = () => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [userSummary, SetUserSummary] = useState<UserSummary>({
    totalReferred: 0,
    totalPaid: 0,
    amountGotten: 0,
  });
  const [el2, setEl2] = useState<HTMLElement | null>(null);
  const [url, setUrl] = useState('');
  const { user } = useSelector((state) => state?.user);

  const { refCode } = user;

  const getUserSummary = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/referrals/user/summary`);
      SetUserSummary(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    const browsUrl = global?.window?.location.origin;
    setUrl(browsUrl);
    setEl(document.getElementById('codeSpan'));
    setEl2(document.getElementById('codeSpan2'));
    getUserSummary();
  }, []);

  const { totalReferred, totalPaid, amountGotten } = userSummary;
  if (loading) return <PageLoader />;
  return (
    <section className={styles.refer_friend}>
      <h2 className={`title ${styles.title}`}>Refer a friend</h2>
      <div className={styles.left}>
        <h3>
          {' '}
          Refer a friend to get{' '}
          <span style={{ color: '#C03E21' }}>
            <strong>10% off</strong>
          </span>{' '}
          your next subscription
        </h3>
        <p>
          When you refer a friend, they need to become a paid subscriber for
          this offer to be valid.
        </p>
      </div>
      <div className={styles.right}>
        <article className={styles.art}>
          <div>
            <h3>Total no. referred</h3>
            <h2 className="title">{totalReferred}</h2>
          </div>
          <div>
            <h3>Total paid subscribers</h3>
            <h2 className="title">{totalPaid}</h2>
          </div>
          <div>
            <h3>Total amount gotten</h3>
            <h2 className="title">&#8358;{`${amountGotten}`}</h2>
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
                {`${url}/signup?referrer=${refCode}`}
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

            {false && <SocialMediaShare />}
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
