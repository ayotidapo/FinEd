/* eslint-disable @next/next/no-img-element */
import Button from 'common/Button';

import { useRouter } from 'next/router';
import styles from './404.module.scss';

const FourOhFour = () => {
  const router = useRouter();
  return (
    <div className={styles._404}>
      <div style={{ width: '150px', height: '150px' }}>
        <img src="/assets/empty.svg" alt="empty-state" />
      </div>
      <h1 className="title">Page Not Found</h1>
      <p style={{ textAlign: 'center', marginTop: '0', color: '#7c7c7c' }}>
        The page you are looking for is not available{' '}
      </p>
      <Button bg="#c03e21" onClick={() => router.back()}>
        Go back
      </Button>
    </div>
  );
};
export default FourOhFour;
