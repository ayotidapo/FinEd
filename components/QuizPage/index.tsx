import { useEffect, useState } from 'react';
import Button from 'common/Button';
import Icon from 'common/Icon';
import Radio from 'common/Radio';
import styles from './quiz.module.scss';
import { getCourseQuiz } from './function';

export interface IQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  answers: string[];
}

export interface IQuiz {
  id: string;
  questions: IQuestion[];
  [key: string]: any;
}

interface Props {
  quiz: IQuiz;
}

const QuizPage: React.FC<Props> = (props) => {
  const { questions } = props.quiz;
  const queLen = questions?.length;
  const [num, setNum] = useState(0);
  console.log(queLen, 9000);
  const [que, setQue] = useState(questions);

  const onsetX = (act: string) => {
    if (num < queLen - 1 && act === 'nxt') setNum(num + 1);
    if (num > 0 && act === 'prev') setNum(num - 1);
  };

  console.log(que[num]?.answers, 70);

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
                <Radio name="option" value={ans.answer} id={ans.answer} />
                &nbsp;&nbsp; {ans.answer}
              </li>
            ))}
          </ol>
        </>

        <div className={styles.btn_nav}>
          <Button className="invrt-btn" onClick={() => onsetX('prev')}>
            <Icon id="arrow-left" /> Previous question
          </Button>
          <Button bg="#c03e21" onClick={() => onsetX('nxt')}>
            Submit answer <Icon id="arrow-right" />
          </Button>
        </div>
      </article>
    </div>
  );
};

export default QuizPage;
