import { createSlice } from "@reduxjs/toolkit"
import dishService from "../services/dishService"

const distinctMainIngredientsListSlice = createSlice({
	name: 'distinctMainIngredientsList',
	initialState: [],
	reducers: {
		setDistinctMainIngredientsList(state, action) {
			return action.payload
		}
	}
})

export const { setDistinctMainIngredientsList } = distinctMainIngredientsListSlice.actions

export const initializeDistinctMainIngredientsList = () => {
	return async dispatch => {
		const distinctMainIngredientsList = await dishService.getUniqueMainIngredientsWithDishes()
		dispatch(setDistinctMainIngredientsList(distinctMainIngredientsList))
	}
}

export default distinctMainIngredientsListSlice.reducer