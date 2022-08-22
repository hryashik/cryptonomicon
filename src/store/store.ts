import { configureStore } from "@reduxjs/toolkit";
import tickersSlice from "./slices/tickersSlice";
import { useDispatch } from "react-redux";
import graphSlice from "./slices/graphSlice";
const store = configureStore({
	reducer: {
		tickersSlice,
		graphSlice
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store
