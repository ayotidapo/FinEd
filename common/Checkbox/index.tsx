import styles from './checkbox.module.scss'

interface Props {
	level: string
}

const Checkbox: React.FC<Props> = (props) => {
	const { level } = props
	return (
		<label className={`hand ${styles.checkbox}`}>
			<input type="checkbox" name={level} id={level} />
			<span className={styles.cbox} />

		</label>
	)
}
export default Checkbox