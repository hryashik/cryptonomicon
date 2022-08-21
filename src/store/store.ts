import { configureStore } from "@reduxjs/toolkit";
import tickersSlice from "./slices/tickersSlice";
import { useDispatch } from "react-redux";
const store = configureStore({
	reducer: {
		tickersSlice
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store
