import './app.scss'
import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store/store";
import { addItem, deleteItem, subscribeTicker } from "./store/slices/tickersSlice";
import ItemCard from "./components/Card/ItemCard";
import Graph from "./components/Graph/Graph";
import AutoInput from "./components/Autocomplete/AutoInput";
import { hiddenGraph } from "./store/slices/graphSlice";

const App: React.FC = () => {
	const dispatch = useAppDispatch()
	// Selectors
	const { inputValue, items } = useSelector((state: RootState) => state.tickersSlice)
	const graphIsSeen = useSelector((state: RootState) => state.graphSlice.isSeen)
	const currentTicker = useSelector((state: RootState) => state.graphSlice.currentTicker)
	//Handlers
	function clickOnAdd() {
		let intervalId = setInterval(() => dispatch(subscribeTicker(inputValue)), 3000)
		dispatch(addItem({ name: inputValue, intervalId }))
	}
	function clickOnDelete(e: React.FormEvent, name: string) {
		e.stopPropagation()
		dispatch(deleteItem(name))
		clearInterval(items.find(el => el.name === name)?.intervalId)
		if (name === currentTicker) {
			dispatch(hiddenGraph())
		}
	}

	return (
		<div className={'app'}>
			<AutoInput/>
			<Button onClick={clickOnAdd} variant="outlined">
				Add
			</Button>
			{items.length ? <hr style={{ marginBottom: '15px' }}/> : ''}
			<div className={'cardWrapper'}>
				{items.map(item =>
					<ItemCard name={item.name} price={item.price} clickOnDelete={clickOnDelete} key={item.name}/>
				)}
			</div>
			{graphIsSeen ? <hr style={{ marginBottom: '15px' }}/> : ''}
			{graphIsSeen ?
				<div className={'graph'}>
					<Graph/>
				</div>
				: ''
			}
		</div>
	)
}
export default App
