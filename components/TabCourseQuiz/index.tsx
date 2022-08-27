import Icon from 'common/Icon';
import { IContent } from 'components/VideoDetails';
import styles from './tabquiz.module.scss';

interface Props {
  resources: any[];
  onClickTab: (id: boolean) => void;
}

const TabCourseQuiz: React.FC<Props> = (props) => {
  const { resources, onClickTab } = props;

  return (
    <>
      <p className="hand" onClick={() => onClickTab(true)}>
        Quiz
      </p>
      <div className={styles.content}>
        <ul>
          {resources.map((resource: IContent, i: number) => (
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
    </>
  );
};

export default TabCourseQuiz;
