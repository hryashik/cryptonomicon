import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiService } from "../../api/ApiService";

export const fetchData = createAsyncThunk('fetchData', async (value: string) => {
	return await ApiService.getData(value)
})

type Item = {
	name: string
	price?: number
}

type InitialStateType = {
	inputValue: string
	items: Item[]
}

const initialState: InitialStateType = {
	inputValue: '',
	items: []
}
const mainSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		changeInputValue(state, action: PayloadAction<string>) {
			state.inputValue = action.payload
		},
		addItem(state, action: PayloadAction<string>) {
			const obj = {name: action.payload, price: 10}
			state.items.push(obj)
			state.inputValue = ''
		},
		deleteItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(item => item.name !== action.payload)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchData.fulfilled, (state, action) => {
			const obj = {name: state.inputValue, price: action.payload.USD}
			state.items.push(obj)
		})
	}
})

export const {changeInputValue, addItem, deleteItem} = mainSlice.actions
export default mainSlice.reducer
