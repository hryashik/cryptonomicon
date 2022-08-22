import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isSeen: false,
	currentTicker: '',
}

const graphSlice = createSlice({
	name: 'Graph',
	initialState,
	reducers: {
		selectTicker(state, action: PayloadAction<string>) {
			state.currentTicker = action.payload
			state.isSeen = true
		},
	}
})

export const {selectTicker} = graphSlice.actions
export default graphSlice.reducer
