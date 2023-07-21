const { sequelize } = require('../utils/db')
const Dish = require('./dish')
const MainIngredient = require('./mainIngredient')
const Sequelize = require('sequelize')

MainIngredient.hasMany(Dish)
Dish.hasOne(MainIngredient)

Dish.sync({alter: true})
MainIngredient.sync({alter:true})

module.exports = {
	Dish,
	MainIngredient
}