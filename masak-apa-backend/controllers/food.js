const foodRouter = require('express').Router()
const Food = require('../models/food')
const middleware = require('../utils/middleware')

const randomNumber = (min, max) => {
	return Math.floor(Math.random()  * (max - min) + min)
}

foodRouter.get('/', async (request, response) => {
	return response.send(`You've reached the foodRouter.`)
})

foodRouter.get('/all-foods',async (request, response) => {
	const allFoods = await Food.find({})
	return response.json(allFoods)
})

foodRouter.get('/byFoodId/:id', async (request, response) => {
	const id = request.params.id
	const food = await Food.findById(id)
	if (food) {
		return response.json(food)
	} else {
		return response.sendStatus(404).end()
	}
})

foodRouter.get('/distinct-main-ingredients', async (request, response) => {
	const distinctMainIngredients = await Food.find({}).distinct('mainIngredient')
	return response.json(distinctMainIngredients)
})

foodRouter.get('/random', async (request, response) => {
	const allFoods = await Food.find({})
	const length = allFoods.length
	const randomIndex = randomNumber(0, length)

	return response.json(allFoods[randomIndex])
})

foodRouter.post('/random-food-by-mainIngredient', async (request, response) => {
	const mainIngredient = request.body.mainIngredient
	const allFoods = await Food.find({})
	// console.log(allFoods)
	const mainIngredientFoodList = allFoods.filter(food => food.mainIngredient === mainIngredient)
	const randomIndex = randomNumber(0, mainIngredientFoodList.length)
	return response.json(mainIngredientFoodList[randomIndex])
})

foodRouter.get('/random-food-by-mainIngredient/:mainIngredient', async (request, response) => {
	const mainIngredient = request.params.mainIngredient
	const allFoods = await Food.find({})
	// console.log(allFoods)
	const mainIngredientFoodList = allFoods.filter(food => food.mainIngredient === mainIngredient)
	const randomIndex = randomNumber(0, mainIngredientFoodList.length)
	return response.json(mainIngredientFoodList[randomIndex])
})

foodRouter.post('/', async (request, response) => {
	const body = request.body
	const newFood = new Food({
		foodGroup: body.foodGroup,
		mainIngredient: body.mainIngredient,
		dishName: body.dishName,
		dishIngredients: body.dishIngredients
	})
	const savedFood = await newFood.save()
	return response.json(savedFood)
})


module.exports = foodRouter