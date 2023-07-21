import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMainIngredient } from '../reducers/selectedMainIngredientReducer';
import { getRandomDish, setRandomDish } from '../reducers/randomDishReducer';
import dishService from '../services/dishService';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

function MainSelector() {
	const dispatch = useDispatch()
	
	const handleChangeMainIngredient = async (event) => {
		event.preventDefault();
		const dropdownSelectedMainIngredient = event.target.value
		dispatch(setSelectedMainIngredient(dropdownSelectedMainIngredient))
		// const randomDish = await axios.get(`http://localhost:3003/food/random-food-by-mainIngredient/${event.target.value}`)
		// const randomDish = await getRandomDishWithSelectedMainIngredient(event.target.value)
		// console.log(randomDish.dishName)
		// setRandomDish(randomDish)

		dispatch(getRandomDish(dropdownSelectedMainIngredient))

	}

	const handleChangeMainIngredient2 = async (eventKey) => {
		const dropdownSelectedMainIngredient = eventKey
		dispatch(setSelectedMainIngredient(dropdownSelectedMainIngredient))

		dispatch(getRandomDish(dropdownSelectedMainIngredient))

	}

	// const currentlySelectedMainIngredient = useSelector(state => state.selectedMainIngredient)
	const dIngredientsList = useSelector(state => state.distinctMainIngredientsList)
	const sMainIngredient = useSelector(state => state.selectedMainIngredient)
	const rDish = useSelector(state => state.randomDish)
	
	const handleRerollClick = async (event) => {
		event.preventDefault()
		let sameDish = true
		let counter = 0
		while (sameDish && counter < 3) {
			const newRandomDish = await dishService.getRandomDishWithSelectedMainIngredient(sMainIngredient)
			// console.log(newRandomDish)
			sameDish = newRandomDish.dish_name === rDish.dish_name
			if (!sameDish) {
				dispatch(setRandomDish(newRandomDish))
			}
			counter ++
		}
	}

	const handleRerollClick2 = async () => {
		// event.preventDefault()
		let sameDish = true
		let counter = 0
		while (sameDish && counter < 3) {
			const newRandomDish = await dishService.getRandomDishWithSelectedMainIngredient(sMainIngredient)
			// console.log(newRandomDish)
			sameDish = newRandomDish.dish_name === rDish.dish_name
			if (!sameDish) {
				dispatch(setRandomDish(newRandomDish))
			}
			counter ++
		}
	}
	
	
	return (
	<div className='main-selector page-element'>
		<div className='main-ingredient-dropdown'>
			<div className='text'>What to cook?</div>
			{/* <select value={sMainIngredient} onChange={handleChangeMainIngredient}>
					{dIngredientsList.map((item, index) => <option value={item} key={index}>{item}</option>)}
			</select> */}

			<DropdownButton id="dropdown-basic-button" title={sMainIngredient} onSelect={handleChangeMainIngredient2}>
				{dIngredientsList.map((item, index) => 
				<DropdownItem key={index} eventKey={item}>{item}</DropdownItem>
				)}
			</DropdownButton>	

			{/* <button id='reroll-button' onClick={handleRerollClick}>Reroll</button> */}
			<Button variant='primary' onClick={handleRerollClick2}>Reroll</Button>
		</div>
		<div className='main-ingredient-content'>
			<div className='we-cook'>We cook {sMainIngredient} today!</div>
			<div className='random-dish'>{rDish.dish_name}</div>
		</div>
		{/* <div>
			Ingredients:
			<ul>{randomDish? randomDish.dishIngredients.map((ingredient, index) => <li key={index}>{ingredient}</li>) :''}</ul>
		</div> */}
	</div>
  )
}

export default MainSelector