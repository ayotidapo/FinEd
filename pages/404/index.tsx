import Button from 'common/Button';
import { useRouter } from 'next/router';
import styles from './404.module.scss';

const FourOhFour = () => {
  const router = useRouter();
  return (
    <div className={styles._404}>
      <h1 className="title">404 - Page Not Found</h1>
      <Button bg="#c03e21" onClick={() => router.back()}>
        Go back
      </Button>
    </div>
  );
};
export default FourOhFour;
