import './app.scss'
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store/store";
import { addItem, changeInputValue, deleteItem, fetchData } from "./store/slices/mainSlice";
import ItemCard from "./components/Card/ItemCard";

const App: React.FC = () => {
	function clickOnAdd() {
		dispatch(fetchData(inputValue))
	}
	function clickOnDelete(value: string) {
		dispatch(deleteItem(value))
	}
	const dispatch = useAppDispatch()
	const changeInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
		dispatch(changeInputValue(e.target.value))
	}
	const keyDownInput = (e: any) => {
		if (e.key === 'Enter') {
			dispatch(addItem(inputValue))
		}
	}
	const inputValue = useSelector((state: RootState) => state.mainSlice.inputValue)
	const items = useSelector((state: RootState) => state.mainSlice.items)
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
			<div className={'cardWrapper'}>
				{items.map(item =>
					<ItemCard name={item.name} price={item.price} clickOnDelete={clickOnDelete} key={item.name}/>
				)}
			</div>
		</div>
	)
}
export default App
