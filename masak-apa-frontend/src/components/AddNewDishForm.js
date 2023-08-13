import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import dishService from "../services/dishService"
import { setNotification } from "../reducers/notificationReducer"
import { initializeAllMainIngredients } from "../reducers/allMainIngredientsReducer"
import { initializeDistinctMainIngredientsList } from "../reducers/distinctMainIngredientsListReducer"
import { Form, Button } from "react-bootstrap"
import DropdownItem from "react-bootstrap/esm/DropdownItem"
import DropdownButton from "react-bootstrap/esm/DropdownButton"

export const AddNewDishForm = () => {
	const dispatch = useDispatch()
	const [visible, setVisible] = useState(false)
	const [randStr, setRandStr] = useState('')
	const [entryMainIngredient, setEntryMainIngredient] = useState('chicken')
	
	const handleSubmit = async (event) => {
		event.preventDefault()
		const newDishName = event.target.newDish.value
		if (newDishName === '') {
			dispatch(setNotification(`Must provide dish name!`, 3000))
			return
		}
		event.target.newDish.value = ''
		const newDish = {
			main_ingredient_name: entryMainIngredient,
			dish_name: newDishName
		}

		try {
			await dishService.addNewDish(newDish)
			// console.log(`mainIngredient: ${entryMainIngredient}, newDish: ${newDishName}`)
			dispatch(setNotification(`New dish '${newDishName}' with main ingredient ${entryMainIngredient} added!`,3000))
			dispatch(initializeDistinctMainIngredientsList())
			// return response.data
		} catch (error) {
			dispatch(setNotification(`Error adding new dish :(`, 3000))
			// return
		}
	}

	const handleSubmit2 = async (event) => {
		event.preventDefault()
		const newDishName = event.target.newDish2.value
		// console.log(newDishName)
		if (newDishName === '') {
			dispatch(setNotification(`Must provide dish name!`, 3000))
			return
		}
		event.target.newDish2.value = ''
		const newDish = {
			main_ingredient_name: entryMainIngredient,
			dish_name: newDishName
		}

		try {
			await dishService.addNewDish(newDish)
			// console.log(`mainIngredient: ${entryMainIngredient}, newDish: ${newDishName}`)
			dispatch(setNotification(`New dish '${newDishName}' with main ingredient ${entryMainIngredient} added!`,3000))
			dispatch(initializeDistinctMainIngredientsList())
			// return response.data
		} catch (error) {
			dispatch(setNotification(`Error adding new dish :(`, 3000))
			// return
		}
	}

	const handleTogglable = () => {
		setVisible(!visible)
	}
	const buttonText = visible? 'Cancel': 'Add'
	const allMainIngredients = useSelector(state => state.allMainIngredients)
	const dIngredientsList = useSelector(state => state.distinctMainIngredientsList)
	const sMainIngredient = useSelector(state => state.selectedMainIngredient)

	return (
		<div className="add-new-dish page-element">
			<div>
				<Form onSubmit={event => handleSubmit2(event)}>
				<div className="new-dish-top">
					
					<span>
						Select a main ingredient
					</span>
					<DropdownButton id="dropdown-basic-button" title={entryMainIngredient} onSelect={event => {setEntryMainIngredient(event)}}>
						{allMainIngredients.map((item, index) => 
						<DropdownItem key={index} eventKey={item.name}>{item.name}</DropdownItem>
						)}
					</DropdownButton>	
				</div>
					<div className="new-dish-bottom">
						<Form.Label htmlFor="newDish2">Enter new dish name:</Form.Label>
						<div className="new-dish-input">
							<Form.Control
								type="text"
								id="newDish2"
							/>
							<Button type="submit">Submit</Button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	)
}