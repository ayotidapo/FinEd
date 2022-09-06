import React, { useEffect, useState } from 'react';
import Button from 'common/Button';
import Icon from 'common/Icon';
import Radio from 'common/Radio';
import styles from './quiz.module.scss';
import { submitQuiz } from './function';

export interface IQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  answers: { answer: string; position: number }[];
  [key: string]: any;
}

export interface IQuiz {
  id: string;
  questions: IQuestion[];
  [key: string]: any;
}

interface Props {
  quiz: IQuiz;
  setLastVideoEnd: any;
  setIsQuizCompleted: any;
}

const QuizPage: React.FC<Props> = (props) => {
  const { questions } = props.quiz;
  const queLen = questions?.length;

  const [num, setNum] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [numAnsd, setNumAnsd] = useState(-1);
  const [loading, setLoading] = useState(false);

  const [que, setQue] = useState(questions);

  const onsetX = (act: string) => {
    if (num < queLen - 1 && act === 'nxt') setNum(num + 1);
    if (num > 0 && act === 'prev') setNum(num - 1);
  };

  const nxtBtnText = num < queLen - 1 ? 'Next Question' : 'Submit';

  const onChoose = (e: any) => {
    const { checked, value } = e.target;
    if (checked) {
      setDisabled(false);
      const quez = [...que];
      const curQue = quez[num];

      curQue.myAnswerPos = Number(value);
      if (num > numAnsd) setNumAnsd(num);
      setQue(quez);
      console.log(quez);
    }
  };

  const onSubmit = async () => {
    if (num < queLen - 1) return onsetX('nxt');
    setLoading(true);
    const myAnswers = que.map((q) => ({
      questionId: q?.id,
      answer: q?.myAnswerPos,
    }));
    const body = {
      answers: myAnswers,
    };
    await submitQuiz(props?.quiz?.id, body);
    props.setLastVideoEnd(true); // this always open the Entire Modal which is RateReview Component
    props.setIsQuizCompleted(true);
    setLoading(false);
  };

  useEffect(() => {
    if (num > numAnsd) setDisabled(true);
    else setDisabled(false);
  }, [num, numAnsd]);

  return (
    <div className={styles.quiz_wrapper}>
      <div className={styles.top}>
        <h2 className="title">Quiz</h2>
        <span>
          {num + 1} out of {queLen} questions
        </span>
      </div>

      <article className={styles.quest_wrapper}>
        <>
          <h2 className="title">
            {num + 1}. {que[num]?.question}?
          </h2>
          <p>Select your answer below</p>
          <ol className={styles.options_box}>
            {que[num]?.answers.map((ans: any, i: number) => (
              <li key={i}>
                <Radio
                  name="option"
                  value={ans.position}
                  checked={ans.position === que[num].myAnswerPos}
                  id={ans.position}
                  onChange={onChoose}
                />
                &nbsp;&nbsp; {ans.answer}
              </li>
            ))}
          </ol>
        </>

        <div className={styles.btn_nav}>
          {num > 0 && (
            <Button className="invrt-btn" onClick={() => onsetX('prev')}>
              <Icon id="arrow-left" />
              &nbsp; Previous question
            </Button>
          )}
          <Button
            bg="#c03e21"
            onClick={onSubmit}
            disabled={disabled}
            loading={loading}
          >
            {nxtBtnText} <Icon id="arrow-right" />
          </Button>
        </div>
      </article>
    </div>
  );
};

export default QuizPage;
