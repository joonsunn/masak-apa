const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const MainIngredient = require('./mainIngredient')

class Dish extends Model {}

Dish.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	dish_name : {
		type: DataTypes.TEXT,
		allowNull: false
	},
	main_ingredient_id : {
		type: DataTypes.INTEGER,
		references: MainIngredient.id
	}
},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'dish'
	}
)

// Dish.belongsToMany(MainIngredient, {through: "DishMainIngredient"})

Dish.sync()

module.exports = Dish