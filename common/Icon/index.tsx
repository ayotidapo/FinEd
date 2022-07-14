import React from 'react';

interface Props {
  id: string;
  height?: number;
  width?: number;
  className?: string;
  style?: object;
  onClick?: (e: any) => void;
}

const Icon: React.FC<Props> = (props) => {
  const { id, height, width, onClick, ...rest } = props;
  return (
    <svg
      width={width || 24}
      height={height || 24}
      {...rest}

    >
      <use xlinkHref={`/icon-sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
