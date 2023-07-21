import { createSlice } from "@reduxjs/toolkit";
import dishService from "../services/dishService";
import { useSelector } from "react-redux";


const randomDishSlice = createSlice({
	name: 'randomDish',
	initialState: '',
	reducers: {
		setRandomDish(state, action) {
			return action.payload
		}
	}
})

export const { setRandomDish } = randomDishSlice.actions

export const initializeRandomDish = () => {
	return async dispatch => {
		const mainIngredientList = await dishService.getUniqueMainIngredientsWithDishes()
		const randomDish = await dishService.getRandomDishWithSelectedMainIngredient(mainIngredientList[0])
		dispatch(setRandomDish(randomDish))
	}
}

export const getRandomDish = (mainIngredient) => {
	
	return async dispatch => {
		const randomDish = await dishService.getRandomDishWithSelectedMainIngredient(mainIngredient)
		dispatch(setRandomDish(randomDish))
	}
}

export default randomDishSlice.reducer