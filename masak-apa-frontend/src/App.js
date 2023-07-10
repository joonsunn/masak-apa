import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
	const [distinctMainIngredientList, setDistinctMainIngredientList] = useState([])
	const [selectedMainIngredient, setSelectedMainIngredient] = useState('')
	const [randomDish, setRandomDish] = useState('')

	useEffect(() => {
		getDistinctMainIngredients()
		// setSelectedMainIngredient(distinctMainIngredientList[0])
	}, [])

	const baseUrl = `http://localhost:3003/food/distinct-main-ingredients`
	
	const getDistinctMainIngredients = async () => {
		const distinctMainIngredientList = await axios.get(baseUrl)
		console.log(distinctMainIngredientList.data)

		setDistinctMainIngredientList(distinctMainIngredientList.data)
		setSelectedMainIngredient(distinctMainIngredientList.data[0])
		const randomDish = await getRandomDishWithSelectedMainIngredient(distinctMainIngredientList.data[0])
		setRandomDish(randomDish)
	}

	const getRandomDishWithSelectedMainIngredient = async (mainIngredient) => {
		const randomDish = await axios.get(`http://localhost:3003/food/random-food-by-mainIngredient/${mainIngredient}`)
		
		return randomDish.data
	}

	const handleChangeMainIngredient = async (event) => {
		event.preventDefault();
		setSelectedMainIngredient(event.target.value)
		// const randomDish = await axios.get(`http://localhost:3003/food/random-food-by-mainIngredient/${event.target.value}`)
		const randomDish = await getRandomDishWithSelectedMainIngredient(event.target.value)
		// console.log(randomDish.dishName)
		setRandomDish(randomDish)
	}

	const handleRerollClick = async (event) => {
		event.preventDefault()
		let sameDish = true
		while (sameDish) {
			const newRandomDish = await getRandomDishWithSelectedMainIngredient(selectedMainIngredient)
			sameDish = newRandomDish.dishName === randomDish.dishName
			if (!sameDish) {
				setRandomDish(newRandomDish)
			}
		}
	}
	
	return (
    <div className="App">
		Hello World
		{distinctMainIngredientList.map((item, index) => <li key={index}>{item}</li>)}
		<div>
			<label className='dropdown'>
				What to cook?
				<select value={selectedMainIngredient} onChange={handleChangeMainIngredient}>
						{distinctMainIngredientList.map((item, index) => <option value={item} key={index}>{item}</option>)}
				</select>
			</label>
				<button onClick={handleRerollClick}>Reroll</button>
			<div className='we-cook'>We cook {selectedMainIngredient}!</div>
			<div className='random-dish'>{randomDish.dishName}</div>
			<div>
				Ingredients:
				<ul>{randomDish? randomDish.dishIngredients.map((ingredient, index) => <li key={index}>{ingredient}</li>) :''}</ul>
			</div>
		</div>
    </div>
  );
}

export default App;
