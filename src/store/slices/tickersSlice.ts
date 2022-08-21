import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiService } from "../../api/ApiService";

export const subscribeTicker = createAsyncThunk('fetchData', async (value: string) => {
	return await ApiService.getData(value)
})

type Item = {
	name: string
	price?: number | string
	intervalId: NodeJS.Timer
}

type InitialStateType = {
	inputValue: string
	items: Item[]
}

type AddItemType = {
	name: string
	intervalId: NodeJS.Timer
}

const initialState: InitialStateType = {
	inputValue: '',
	items: []
}

const tickersSlice = createSlice({
	name: 'Tickers',
	initialState,
	reducers: {
		changeInputValue(state, action: PayloadAction<string>) {
			state.inputValue = action.payload
		},
		addItem(state, action: PayloadAction<AddItemType>) {
			const obj = {name: action.payload.name, price: '-', intervalId: action.payload.intervalId}
			state.items.push(obj)
			state.inputValue = ''
		},
		deleteItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(item => item.name !== action.payload)
		},
/*		fetchData(state, action: PayloadAction<string>) {
			const obj = {name: action.payload, price: 0}
			state.items.push(obj)
		}*/
	},
	extraReducers: (builder) => {
		builder.addCase(subscribeTicker.fulfilled, (state, action) => {
			const ref = state.items.find(el => el.name === action.meta.arg)
			if (ref) {
				ref.price = action.payload.USD
			}
		})
	}
})

export const {changeInputValue, addItem, deleteItem} = tickersSlice.actions
export default tickersSlice.reducer
