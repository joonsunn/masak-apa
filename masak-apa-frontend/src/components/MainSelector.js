import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMainIngredient } from '../reducers/selectedMainIngredientReducer';
import { getRandomDish, setRandomDish } from '../reducers/randomDishReducer';
import dishService from '../services/dishService';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

function MainSelector() {
	const dispatch = useDispatch()
	

	const handleChangeMainIngredient2 = async (eventKey) => {
		const dropdownSelectedMainIngredient = eventKey
		dispatch(setSelectedMainIngredient(dropdownSelectedMainIngredient))

		dispatch(getRandomDish(dropdownSelectedMainIngredient))

	}

	const dIngredientsList = useSelector(state => state.distinctMainIngredientsList)
	const sMainIngredient = useSelector(state => state.selectedMainIngredient)
	const rDish = useSelector(state => state.randomDish)

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
			<DropdownButton id="dropdown-basic-button" title={sMainIngredient} onSelect={handleChangeMainIngredient2}>
				{dIngredientsList.map((item, index) => 
				<DropdownItem key={index} eventKey={item}>{item}</DropdownItem>
				)}
			</DropdownButton>	
			<Button variant='primary' onClick={handleRerollClick2}>Reroll</Button>
		</div>
		<div className='main-ingredient-content'>
			<div className='we-cook'>We cook {sMainIngredient} today!</div>
			<div className='random-dish'>{rDish.dish_name}</div>
		</div>
	</div>
  )
}

export default MainSelector