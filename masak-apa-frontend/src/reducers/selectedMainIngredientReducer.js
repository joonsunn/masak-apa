import { createSlice } from "@reduxjs/toolkit";
import dishService from "../services/dishService";

const selectedMainIngredientSlice = createSlice({
	name: 'selectedMainIngredient',
	initialState: '',
	reducers: {
		setSelectedMainIngredient(state, action) {
			return action.payload
		}
	}
})

export const { setSelectedMainIngredient } = selectedMainIngredientSlice.actions

export const initializeSelectedMainIngredient = () => {
	return async dispatch => {
		const mainIngredientList = await dishService.getUniqueMainIngredientsWithDishes()
		dispatch(setSelectedMainIngredient(mainIngredientList[0]))
	}
}

export default selectedMainIngredientSlice.reducer