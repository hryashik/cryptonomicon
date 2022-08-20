import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/mainSlice";
import { useDispatch } from "react-redux";
const store = configureStore({
	reducer: {
		mainSlice
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store
