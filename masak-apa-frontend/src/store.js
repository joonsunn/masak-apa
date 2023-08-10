import { configureStore } from "@reduxjs/toolkit";
import distinctMainIngredientsListReducer from "./reducers/distinctMainIngredientsListReducer";
import selectedMainIngredientReducer from "./reducers/selectedMainIngredientReducer";
import randomDishReducer from "./reducers/randomDishReducer";
import notificationReducer from "./reducers/notificationReducer";
import allMainIngredientsReducer from "./reducers/allMainIngredientsReducer";
import allDishesReducer from "./reducers/allDishesReducer";

export const store = configureStore({
	reducer: {
		distinctMainIngredientsList: distinctMainIngredientsListReducer,
		selectedMainIngredient: selectedMainIngredientReducer,
		randomDish: randomDishReducer,
		notification: notificationReducer,
		allMainIngredients: allMainIngredientsReducer,
		allDishes: allDishesReducer
	}
})

