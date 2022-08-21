import './app.scss'
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store/store";
import { addItem, changeInputValue, deleteItem, subscribeTicker } from "./store/slices/tickersSlice";
import ItemCard from "./components/Card/ItemCard";

const App: React.FC = () => {
	function clickOnAdd() {
		let intervalId = setInterval(() => dispatch(subscribeTicker(inputValue)), 3000)
		dispatch(addItem({ name: inputValue, intervalId }))
	}

	function clickOnDelete(name: string) {
		dispatch(deleteItem(name))
		clearInterval(items.find(el => el.name === name)?.intervalId)
	}

	function keyDownInput(e: any) {
		if (e.key === 'Enter') {
			let intervalId = setInterval(() => dispatch(subscribeTicker(inputValue)), 3000)
			dispatch(addItem({ name: inputValue, intervalId }))
		}
	}

	const dispatch = useAppDispatch()
	const changeInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
		dispatch(changeInputValue(e.target.value))
	}

	const inputValue = useSelector((state: RootState) => state.tickersSlice.inputValue)
	const items = useSelector((state: RootState) => state.tickersSlice.items)
	return (
		<div className={'app'}>
			<div className={'searchWrapper'}>
				<TextField
					autoFocus={true}
					variant={"outlined"}
					label={'Cryptocurrency'}
					sx={{ marginBottom: '5px' }}
					value={inputValue}
					onChange={(event) => changeInput(event)}
					onKeyDown={(e) => keyDownInput(e)}
				/>
				<Button
					onClick={clickOnAdd}
					variant="outlined"
				>
					Add
				</Button>
			</div>
			{items.length ? <hr style={{ marginBottom: '15px' }}/> : ''}
			<div className={'cardWrapper'}>
				{items.map(item =>
					<ItemCard name={item.name} price={item.price} clickOnDelete={clickOnDelete} key={item.name}/>
				)}
			</div>
		</div>
	)
}
export default App
