import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { addItem, changeInputValue, subscribeTicker } from "../../store/slices/tickersSlice";

export default function AutoInput() {
	const dispatch = useAppDispatch()
	const inputValue = useSelector((state: RootState) => state.tickersSlice.inputValue)
	const changeInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
		dispatch(changeInputValue(e.target.value))
	}
	function keyDownInput(e: any) {
		if (e.key === 'Enter') {
			let intervalId = setInterval(() => dispatch(subscribeTicker(inputValue)), 3000)
			dispatch(addItem({ name: inputValue, intervalId }))
		}
	}
	function changeComplete(event: any) {
		dispatch(changeInputValue(event.currentTarget.innerText))
	}
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={topCoins}
			sx={{ width: '300px' }}
			onChange={(event) => changeComplete(event)}
			renderInput={(params) => <TextField autoFocus={true}
																					variant={"outlined"}
																					sx={{ marginBottom: '5px' }}
																					value={inputValue}
																					onChange={(event) => changeInput(event)}
																					onKeyDown={(e) => keyDownInput(e)} {...params} label="Coin"/>}
		/>
	);
}

// Crypto coins
const topCoins = [
	{ label: 'BTC' },
	{ label: 'ETH' },
	{ label: 'BUSD' },
	{ label: 'XRP' },
	{ label: 'USDT' },
	{ label: "SOL" },
	{ label: 'EOS' },
	{ label: 'ADA' },
	{ label: 'SHIB' },
	{ label: 'BNB' },
	{ label: 'LTC' },
	{ label: 'ATOM' },
	{ label: 'DOGE'},
	{ label: 'BCH' }
];
