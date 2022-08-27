import Button from 'common/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Icon from 'common/Icon';
import styles from '../ratereview.module.scss';

interface Props {
  onChange: (e: any) => void;
  onSubmit: () => void;
  loading: boolean;
  value: string;
}

const WriteReview: React.FC<Props> = (props) => {
  const { loading, onSubmit, onChange, value } = props;

  return (
    <section className={styles.write_rvw}>
      <h2 className="title">Write a review</h2>
      <textarea
        placeholder="Describe your experience (optional)"
        value={value}
        onChange={onChange}
      ></textarea>

      <div className={styles.btns_div}>
        <Button
          bg="#C03E21"
          className={styles.rateBtn}
          onClick={onSubmit}
          loading={loading}
        >
          Submit
          <Icon id="arrow-right" />
        </Button>
      </div>
    </section>
  );
};
export default WriteReview;

export const Rated = ({ onClose }: { onClose: (x: boolean) => void }) => {
  const router = useRouter();
  const onDismiss = () => {
    onClose(false);
    router.push('/courses');
  };
  return (
    <div className={styles.rated}>
      <div
        style={{
          width: '200px',
          height: '200px',
          position: 'relative',
          display: 'none',
        }}
      >
        <Image
          src="/assets/rated.svg"
          layout="fill"
          alt="course successfully rated"
        />
      </div>
      <section>
        <h2 className="title">Course rated successfully</h2>
        <p>
          Thank you for taking the time to rate this course. Your rating will
          assist us in determining how we can better serve you.
        </p>

        <div className={styles.btns_div}>
          <Button bg="#C03E21" onClick={onDismiss}>
            Dismiss
          </Button>
        </div>
      </section>
    </div>
  );
};
