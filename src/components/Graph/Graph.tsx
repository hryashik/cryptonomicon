import styles from './Graph.module.scss'
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import CloseIcon from '@mui/icons-material/Close';
import { hiddenGraph } from "../../store/slices/graphSlice";

const Graph = () => {
	const dispatch = useAppDispatch()
	function clickOnClose() {
		dispatch(hiddenGraph())
	}
	const { isSeen, currentTicker } = useSelector((state: RootState) => state.graphSlice)
	const ticker = useSelector((state: RootState) => state.tickersSlice.items.find(item => item.name === currentTicker))
	const prices = ticker?.priceHistory
	const historyMapped = normalizeGraph()?.map((item: number, idx) => <div style={{height: `${item}%`}} key={idx} className={styles.columns__item}></div>)
	function normalizeGraph() {
		if (prices) {
			const minValue = Math.min(...prices)
			const maxValue = Math.max(...prices)
			return prices.map(price => 5 + ((price - minValue) * 100) / (maxValue - minValue))
		}
	}
	if (!isSeen && !prices) {
		return <div></div>
	} else {
		return (
			<div className={styles.wrapper}>
				<div onClick={clickOnClose} className={styles.closeIcon}><CloseIcon/></div>
				<h3 className={styles.title}>{currentTicker}</h3>
				<div className={styles.columns}>
					{historyMapped}
				</div>
				<footer>
					{prices ?
						<div className={styles.content}>
							<p>min <strong>{Math.min(...prices)}$</strong></p>
							<p>current <strong>{ticker.price}$</strong></p>
							<p>max <strong>{Math.max(...prices)}$</strong></p>
						</div> : ''}
				</footer>
			</div>
		)
	}
}

export default Graph
