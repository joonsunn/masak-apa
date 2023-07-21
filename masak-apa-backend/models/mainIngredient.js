const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const Dish = require('./dish')


class MainIngredient extends Model {}

MainIngredient.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name : {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true
	}
},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'main_ingredient'
	}
)

// Main_ingredient.belongsToMany(Dish, {through: "DishMainIngredient"})
// Main_ingredient.sync({force: true})

MainIngredient.sync()

module.exports = MainIngredient