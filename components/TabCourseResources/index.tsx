import { useState, useEffect } from 'react';
import Icon from 'common/Icon';
import { IContent } from 'components/VideoDetails';
import { getContentUrl } from 'components/TakeCourse/functions';
import styles from './tabresources.module.scss';
import { toast } from 'react-toastify';

interface Props {
  resources: any[];
}

const TabCourseResources: React.FC<Props> = (props) => {
  const { resources } = props;
  const [file, setFile] = useState<any>({});

  const onDowload = async (id: string) => {
    const response = await getContentUrl(id);
    const fileUrl = response?.file?.url;
    setFile({ fileUrl, resourceId: id });
  };

  useEffect(() => {
    const downloadLink = global?.window?.document.getElementById(
      file?.resourceId,
    );
    downloadLink?.click();
  }, [file?.fileUrl, file?.resourceId]);

  return (
    <>
      <p className="hand">Resource</p>
      <div className={styles.content}>
        <ul>
          {resources?.map((resource: IContent, i: number) => (
            <li
              key={i}
              className="hand"
              onClick={() => onDowload(resource?.id)}
            >
              <abbr
                title={resource.title}
                className={`elips  ${styles.f_sp} ${styles.r_l}`}
              >
                <a id={resource?.id} href={file?.fileUrl} download>
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

export default TabCourseResources;
