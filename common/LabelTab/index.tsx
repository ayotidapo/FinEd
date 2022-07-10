import Icon from 'common/Icon';
import styles from './labeltab.module.scss'

interface Props {
	tab: {
		text: string;
		icon: string;
	}
}

const LabelTab: React.FC<Props> = (props: Props) => {
	const { text, icon } = props?.tab
	return (
		<li className={`hand ${styles.li_tab}`}>
			<Icon id={icon} /><span>{text}</span>
		</li >
	)
}

export default LabelTab