import styles from './checkbox.module.scss'

interface Props {
	level: string,
	isChecked?: boolean
}

const Checkbox: React.FC<Props> = (props) => {
	const { level, isChecked, ...rest } = props
	return (
		<label className={`hand ${styles.checkbox}`}>
			<input type="checkbox" name={level} id={level} checked={isChecked} {...rest} />
			<span className={styles.cbox} />

		</label>
	)
}
export default Checkbox