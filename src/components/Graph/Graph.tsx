import styles from './Graph.module.scss'
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import CloseIcon from '@mui/icons-material/Close';
import { hiddenGraph } from "../../store/slices/graphSlice";
import ArrowDown from '@mui/icons-material/ArrowDownward';
import ArrowUp from '@mui/icons-material/ArrowUpward';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const Graph = () => {
	const dispatch = useAppDispatch()

	function clickOnClose() {
		dispatch(hiddenGraph())
	}

	const { isSeen, currentTicker } = useSelector((state: RootState) => state.graphSlice)
	const ticker = useSelector((state: RootState) => state.tickersSlice.items.find(item => item.name === currentTicker))
	const prices = ticker?.priceHistory
	const historyMapped = normalizeGraph()?.map((item: number, idx) =>
		<div
			style={{ height: `${item}%` }}
			key={idx}
			className={styles.columns__item}
		>
		</div>)

	function normalizeGraph() {
		if (prices) {
			const minValue = Math.min(...prices)
			const maxValue = Math.max(...prices)
			return prices.map(price => 5 + ((price - minValue) * 100) / (maxValue - minValue))
		}
	}

	function comparePrice() {
		if (prices)
			if (prices[prices.length - 1] > prices[prices.length - 2]) {
				return <ArrowUp/>
			} else if (prices[prices.length - 1] < prices[prices.length - 2]) {
				return <ArrowDown/>
			} else {
				return <SyncAltIcon/>
			}
	}

	if (!isSeen && !prices) {
		return <div></div>
	} else {
		return (
			<div className={styles.wrapper}>
				<div className={styles.wrapper__title}>
					<h3 className={styles.title}>{currentTicker}</h3>
					<div onClick={clickOnClose} className={styles.closeIcon}><CloseIcon/></div>
				</div>
				<div className={styles.columns}>
					{historyMapped}
				</div>
				<footer>
					{prices ?
						<div className={styles.content}>
							<div>
								<p>min <strong>{Math.min(...prices)}$</strong></p>
								<p>max <strong>{Math.max(...prices)}$</strong></p>
							</div>
							<div className={styles.content__right}>
								{comparePrice()}
								<p>current <strong>{ticker.price}$</strong></p>
							</div>
						</div> : ''}
				</footer>
			</div>
		)
	}
}

export default Graph
