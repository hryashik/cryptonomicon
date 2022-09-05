import './app.scss'
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store/store";
import { addItem, deleteItem, subscribeTicker } from "./store/slices/tickersSlice";
import ItemCard from "./components/Card/ItemCard";
import Graph from "./components/Graph/Graph";
import AutoInput from "./components/Autocomplete/AutoInput";
import { hiddenGraph } from "./store/slices/graphSlice";
import CustomAlert from "./components/CustomAlert/CustomAlert";

const App: React.FC = () => {
	const [ alert, setAlert ] = useState(false)
	const dispatch = useAppDispatch()
	// Selectors
	const { inputValue, items } = useSelector((state: RootState) => state.tickersSlice)
	const graphIsSeen = useSelector((state: RootState) => state.graphSlice.isSeen)
	const currentTicker = useSelector((state: RootState) => state.graphSlice.currentTicker)

	//Handlers
	function clickOnAdd() {
		//Делаю проверку: новый коин не добавится, если такой коин уже есть (проверка по регистру), а так же проверка на пустое поле
		if (items.find(item => item.name.toLowerCase() === inputValue.toLowerCase()) || !inputValue) {
			setAlert(true)
			setTimeout(() => setAlert(false), 3000)
		} else {
			let intervalId = setInterval(() => dispatch(subscribeTicker(inputValue)), 3000)
			dispatch(addItem({ name: inputValue, intervalId }))
		}
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
			{alert ?
				<div className="alert">
					<CustomAlert/>
				</div> : ""
			}
			<AutoInput/>
			<Button style={{ marginBottom: '15px' }} onClick={clickOnAdd} variant="outlined">
				Add
			</Button>
			{items.length ? <hr style={{ marginBottom: '15px' }}/> : ''}
			<div className={'cardWrapper'}>
				{items.map(item =>
					<ItemCard name={item.name} price={item.price} clickOnDelete={clickOnDelete} key={item.name}/>
				)}
			</div>
			{graphIsSeen ?
				<>
					<hr style={{ marginBottom: '15px' }}/>
					<div className={'graph'}>
						<Graph/>
					</div>
				</> : ''
			}
		</div>
	)
}
export default App
