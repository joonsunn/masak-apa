const mongoose = require('mongoose')
//protein, carbohydrate, vegetable, others
// chicken, mince pork, sliced pork, rice, noodle, cabbage, siu bok choy, mushroom, spaghetti
//Ayam goreng kunyit, fried rice, red sauce pasta, stir fry siu bok choy
//tomato, tumeric, egg

const foodSchema = new mongoose.Schema({
	foodGroup: {
		type: String,	
		required: true
	},
	mainIngredient: {
		type: String,	
		required: true
	},
	dishName: {
		type: String,	
		required: true
	},
	dishIngredients: [
			{
				type: String
			}	
	]

})

foodSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Food', foodSchema)