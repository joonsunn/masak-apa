import { createSlice } from "@reduxjs/toolkit"
import dishService from "../services/dishService"

export const allMainIngredientsSlice = createSlice({
	name: 'allMainIngredients',
	initialState: [],
	reducers: {
		setAllMainIngredients(state, action) {
			return action.payload
		}
	}
})

export const { setAllMainIngredients } = allMainIngredientsSlice.actions

export const initializeAllMainIngredients = () => {
	return async dispatch => {
		const allMainIngredientsList = await dishService.getAllMainIngredients()
		dispatch(setAllMainIngredients(allMainIngredientsList))
	}
}

export default allMainIngredientsSlice.reducer