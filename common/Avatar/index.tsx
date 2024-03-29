import axios from 'helpers/axios';
import { capitalize } from 'helpers';
import Image from 'next/image';
import React, { Children, useEffect, useRef, useState } from 'react';
import { setUser } from 'reducers/user';
import { useDispatch } from 'store';
import styles from './avatar.module.scss';

interface IProps {
  height?: number;
  width?: number;
  isDisabled?: boolean;
  user: {
    avatar: {
      id: string;
      url: string;
      key: string;
    };
    firstName: string;
    lastName: string;
  };
  inputID?: string;
}

const ProfileAvatar: React.FC<IProps> = ({
  height = 35,
  width = 35,
  user,
  isDisabled,
  inputID,
}) => {
  const dispatch = useDispatch();
  const [previewAvatar, setPreviewAvatar] = useState<any>(user?.avatar?.url);
  const fileInput = useRef<HTMLInputElement>(null);

  const focusFileInput = (): void => {
    if (isDisabled) return;
    if (fileInput.current !== null) {
      fileInput.current.click();
    }
  };

  const addImageToPost = async (e: any) => {
    const fileList = e.target.files;
    const reader = new FileReader();
    const formData: FormData = new FormData();

    if (fileList) {
      formData.append('file', fileList[0], fileList[0]?.name);
      reader.readAsDataURL(fileList[0]);
    }

    reader.onload = (readerEvent) => {
      setPreviewAvatar(readerEvent.target?.result);
    };

    const { data } = await axios.post('users/avatar', formData);
    dispatch(setUser(data));
  };

  useEffect(() => {
    setPreviewAvatar(user?.avatar?.url);
  }, [user?.avatar?.url]);

  return (
    <div className={styles.avatar_wrapper}>
      {user?.avatar?.url ? (
        <Image
          src={user?.avatar?.url || '/assets/bag.png'}
          alt={`${user?.firstName} ${user?.lastName}`}
          height={height}
          width={width}
          layout="fill"
          onClick={focusFileInput}
          className="hand"
        />
      ) : (
        <div
          className={styles.avatar}
          style={{ height, width }}
          onClick={focusFileInput}
        >
          {user?.firstName &&
            user?.lastName &&
            `${capitalize(user?.firstName[0])}${capitalize(user?.lastName[0])}`}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        multiple={false}
        onChange={addImageToPost}
        style={{ display: 'none' }}
        id={inputID}
        ref={fileInput}
      />
    </div>
  );
};

export default ProfileAvatar;
