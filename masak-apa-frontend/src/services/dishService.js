import axios from "axios"

const baseUrl = '/dish'

const getUniqueMainIngredientsWithDishes = async () => {
	const uniqueMainIngredientsWithDishesList = await axios.get(`${baseUrl}/uniquemainingredientswithdishes`)
	return uniqueMainIngredientsWithDishesList.data
}

const getAllMainIngredients = async () => {
	const allMainIngredientsList = await axios.get(`${baseUrl}/allmainingredients`)
	// console.log(allMainIngredientsList.data)
	return allMainIngredientsList.data
}

const getRandomDishWithSelectedMainIngredient = async (mainIngredient) => {
	const randomDish = await axios.get(`${baseUrl}/randomdish/${mainIngredient}`)
	return randomDish.data
}

const addNewMainIngredient = async (newMainIngredient) => {
	
	const main_ingredient = {
		name: newMainIngredient
	}
	
	const response = await axios.post(`${baseUrl}/newmainingredient`, main_ingredient)

	return response.data
	// console.log(JSON.stringify(main_ingredient))
}

//TODO
const addNewDish = async (newDish) => {
	const response = await axios.post(`${baseUrl}/newdish`, newDish)

	return response.data
}

const dishService = {
	getUniqueMainIngredientsWithDishes,
	getAllMainIngredients,
	getRandomDishWithSelectedMainIngredient,
	addNewMainIngredient,
	addNewDish
}

export default dishService