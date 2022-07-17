import { BtnLoader } from 'common/Button'
import styles from './ploader.module.scss'
const PageLoader: React.FC = () => {
	return (
		<div className={styles.ploader}>
			<BtnLoader classStyle={styles.spin_col} />
		</div>
	)
}

export default PageLoader