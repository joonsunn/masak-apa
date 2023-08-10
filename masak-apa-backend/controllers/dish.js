const dishRouter = require('express').Router()
const { Sequelize, QueryTypes } = require('sequelize')
const Dish = require('../models/dish')
const MainIngredient = require('../models/mainIngredient')
const middleware = require('../utils/middleware')
const { sequelize } = require('../utils/db')

const randomNumber = (min, max) => {
	return Math.floor(Math.random()  * (max - min) + min)
}

dishRouter.get('/', async (request, response) => {
	return response.send(`You've reached dishRouter.`)
})

dishRouter.get('/alldishes', async (request, response) => {
	const allDishes = await Dish.findAll({})
	const allDishes2 = await sequelize.query('SELECT dishes.id as dish_id, dishes.dish_name, main_ingredients.name as main_ingredient_name FROM dishes LEFT JOIN main_ingredients on dishes.main_ingredient_id = main_ingredients.id', {type: QueryTypes.SELECT})
	return response.json(allDishes2)
})

// dishRouter.post('/newdish', async (request, response) => {
// 	try {
// 		const dish = await Dish.create(request.body)
// 		return response.json(dish)
		
// 	} catch (error) {
// 		console.log(error)
// 		return response.status(400).end()
// 	}
// })

dishRouter.post('/newmainingredient', async (request, response) => {
	try {
		const mainIngredient = await MainIngredient.create(request.body)
		return response.json(mainIngredient)
		
	} catch (error) {
		console.log(error)
		return response.status(400).end()
	}
})

dishRouter.get('/randomdish/:mainingredient', async (request, response) => {
	const main_ingredient = request.params.mainingredient
	const results = await sequelize.query('select dishes.id as dish_id, dishes.dish_name, main_ingredients.name as main_ingredient_name from dishes left join main_ingredients on dishes.main_ingredient_id = main_ingredients.id;', {type: QueryTypes.SELECT})

	const listOfDishesofMainIngredient = results.filter(result => result.main_ingredient_name === main_ingredient)
	const randomIndex = randomNumber(0, listOfDishesofMainIngredient.length)

	return response.json(listOfDishesofMainIngredient[randomIndex])

})

dishRouter.get('/allmainingredients', async (request, response) => {
	const allMainIngredients = await MainIngredient.findAll()
	// const allMainIngredientsList = allMainIngredients.map(item => item.name)
	return response.json(allMainIngredients)
})

dishRouter.get('/uniquemainingredientswithdishes', async (request, response) => {
	const results = await sequelize.query(`select distinct main_ingredient_name from (select main_ingredients.name as main_ingredient_name from main_ingredients inner join dishes on main_ingredients.id = dishes.main_ingredient_id) as foo order by main_ingredient_name ASC;`, {type: QueryTypes.SELECT})
	const results_clean = results.map(item => item.main_ingredient_name)
	return response.json(results_clean)
})

dishRouter.get('/dishbyid/:id', async (request, response) => {
	try {
		const dish = await Dish.findByPk(request.params.id)
		if (dish) {
			return response.json(dish.toJSON())
		} else {
			return response.status(404).json({error: `Dish with id ${request.params.id} not found`}).end()
		}
	} catch (error) {
		console.log(error)
		return response.status(400).end()
	}
})

// dishRouter.delete('/mainingredientbyid/:id', async (request.response) => {

// })

dishRouter.delete('/dishbyid/:id', async (request, response) => {
	try {
		const dish = await Dish.findByPk(request.params.id)

		if (dish) {
			await dish.destroy()
			return response.status(204).end()
		} else {
			return response.status(404).end()
		}

	} catch (error) {
		console.log(error)
		return response.status(400).json({error}).end()
	}
})

dishRouter.post('/newdish', async (request, response) => {
	try {
		const mainIngredient = await MainIngredient.findOne({
			where: {
				name: request.body.main_ingredient_name
			}
		})

		const dish = await Dish.create({
			dish_name: request.body.dish_name,
			main_ingredient_id: mainIngredient.id
		})

		return response.json(dish)
	} catch (error) {
		return response.status(400).json({error}).end()
	}
})

dishRouter.get('/dishwithmainingredient', async (request, response) => {
	const results = await sequelize.query('select dishes.id as dish_id, dishes.dish_name, main_ingredients.name as main_ingredient_name from dishes left join main_ingredients on dishes.main_ingredient_id = main_ingredients.id;', {type: QueryTypes.SELECT})

	const chickenDishes = results.filter(result => result.main_ingredient_name === 'chicken')

	return response.json(results)
})

module.exports = dishRouter