import Button from 'common/Button';
import Checkbox from 'common/Checkbox';
import Icon from 'common/Icon';
import React, { useState } from 'react';
import styles from '../ratereview.module.scss';

interface Props {
  onSubmit: () => void;
  loading: boolean;
  onChoose: (e: any) => void;
  onChange: (e: any) => void;
  feedback: string[];
}

const LowRatings: React.FC<Props> = (props) => {
  const { loading, onSubmit, onChoose, feedback } = props;

  const [others, setOthers] = useState(false);

  const onSetOthers = () => {
    setOthers(!others);
  };

  const submit = () => {
    if (!feedback) return;
    onSubmit();
  };

  return (
    <section className={styles.lowrating}>
      <h2 className="title">Low rating feedback</h2>
      <p>
        We&apos;d want to know why you gave this course a low rating. Your
        feedback will help us
      </p>
      <div className={styles.fdbk_option}>
        <p>
          <Checkbox
            type="checkbox"
            name="feedback"
            value="Course was boring"
            onChange={onChoose}
          />
          <span>Course was boring</span>
        </p>
        <p>
          <Checkbox
            type="checkbox"
            onChange={onChoose}
            name="feedback"
            value="Tutor was not comprehensive"
          />
          <span>Tutor was not comprehensive</span>
        </p>
        <p>
          <Checkbox
            type="checkbox"
            onChange={onChoose}
            name="feedback"
            value="Poor Course Quality"
          />
          <span>Poor Course Quality</span>
        </p>
        <p>
          <Checkbox
            type="checkbox"
            onChange={onChoose}
            name="feedback"
            value="I didn’t learn anything new"
          />
          <span>I didn&apos;t learn anything new</span>
        </p>
        <p>
          <Checkbox
            type="checkbox"
            onChange={onChoose}
            name="feedback"
            value="Ambiguous Course content"
          />
          <span>Ambiguous Course content</span>
        </p>
        <p onClick={onSetOthers}>
          <Checkbox
            type="checkbox"
            name="feedback"
            value="others"
            onChange={onChoose}
          />
          <span>Others</span>
        </p>
        {feedback.includes('others') && (
          <section className={styles.others}>
            <small>Share more details with us</small>
            <textarea onChange={props.onChange}></textarea>
          </section>
        )}
      </div>
      <div className={styles.btns_div}>
        <Button
          bg="#C03E21"
          className={styles.rateBtn}
          onClick={submit}
          loading={loading}
        >
          Rate this course
          <Icon id="arrow-right" />
        </Button>
      </div>
    </section>
  );
};
export default LowRatings;
