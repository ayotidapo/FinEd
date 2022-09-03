import Icon from 'common/Icon';
import { IContent } from 'components/VideoDetails';
import styles from './tabquiz.module.scss';

interface Props {
  onClickTab: (id: boolean) => void;
  isCourseCompleted: boolean;
}

const TabCourseQuiz: React.FC<Props> = (props) => {
  const { onClickTab, isCourseCompleted } = props;

  const takeQuiz = () => {
    if (!isCourseCompleted) return;
    onClickTab(true);
  };
  return (
    <span className={styles.takequiz}>
      <p
        className={`hand ${!isCourseCompleted ? styles.not_allowed : ''}`}
        onClick={takeQuiz}
      >
        Quiz
      </p>
      <div className={styles.content}>
        <ul>
          {[].map((resource: IContent, i: number) => (
            <li key={i} className="hand">
              <abbr
                title={resource.title}
                className={`elips  ${styles.f_sp} ${styles.r_l}`}
              >
                <a download>
                  <Icon id="file" width={20} height={20} />
                  &nbsp;{resource.title}
                </a>
              </abbr>
            </li>
          ))}
        </ul>
      </div>
    </span>
  );
};

export default TabCourseQuiz;
