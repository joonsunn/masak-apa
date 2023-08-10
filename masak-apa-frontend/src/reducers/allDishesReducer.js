import { createSlice } from "@reduxjs/toolkit"
import dishService from "../services/dishService"

export const allDishesSlice = createSlice({
	name: 'allDishes',
	initialState: [],
	reducers: {
		setAllDishes(state, action) {
			return action.payload
		}
	}
})

export const { setAllDishes } = allDishesSlice.actions

export const initializeAllDishes = () => {
	return async dispatch => {
		const allDishes = await dishService.getAllDishes()
		dispatch(setAllDishes(allDishes))
	}
}

export default allDishesSlice.reducer