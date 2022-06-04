import React from 'react'

interface Props {
	id: string;
	height: number;
	width: number
	className?: string,
	style?: object,
	onClickFunc?: () => void
}


const Icon: React.FC<Props> = (props) => {
	const { id, height, width, onClickFunc, ...rest } = props
	return (
		<svg width={width} height={height}  {...rest} onClick={onClickFunc}>
			<use xlinkHref={`/icon-sprite.svg#${id}`} />
		</svg>
	);
}

export default Icon