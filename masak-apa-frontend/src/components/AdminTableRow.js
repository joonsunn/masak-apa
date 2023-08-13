import React, { useState } from 'react'
import { DropdownButton, Dropdown, Button, Form, DropdownItem } from 'react-bootstrap'
import dishService from '../services/dishService'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { initializeAllDishes } from '../reducers/allDishesReducer'

export const AdminTableRow = ({dish}) => {
	const [editMode, setEditMode] = useState(false)
	const [dishMainIngredient, setDishMainIngredient] = useState(dish.main_ingredient_name)
	const [dishName, setDishName] = useState(dish.dish_name)
	
	const dispatch = useDispatch()
	const handleDelete = async (dish) => {
		try {
			if (window.confirm(`Confirm delete dish name ${dish.dish_name} with id ${dish.dish_id}?`)) {
				const response = await dishService.deleteDish(dish.dish_id)
				dispatch(setNotification(`Dish name ${dish.dish_name} with id ${dish.dish_id} deleted`, 3000))
				dispatch(initializeAllDishes())
			} else {
				dispatch(setNotification(`Dish deletion cancelled`, 3000))
			}
		} catch (error) {
			dispatch(setNotification(`Error deleting dish id ${dish.dish_id}`, 3000))
		}
	}

	const handleEditButton = async () => {
		if(editMode) {	//restore original values if cancelling edit mode. Saving editted info is handled by handleSaveButton.
			setDishMainIngredient(dish.main_ingredient_name)
			setDishName(dish.dishName)
		}
		setEditMode(!editMode)
	}

	const handleSaveButton = async (event) => {
		event.preventDefault()
		try {
			await dishService.updateDish(dish.dish_id, {dish_name: dishName, main_ingredient_name: dishMainIngredient})
			dispatch(setNotification('Dish updated successfully', 3000))
			dispatch(initializeAllDishes())
			setEditMode(false)
		} catch (error) {
			dispatch(setNotification('Error Editting Dish Info :(', 3000))
		}
	}
	
	const dIngredientsList = useSelector(state => state.distinctMainIngredientsList)
	return (
	<>
		<tr>
			{!editMode && 
			<>
				<td className='dishId-col'>{dish.dish_id}</td>
				<td className='dishName-col'>{dish.dish_name}</td>
				<td className='dishMainIngredient-col'>{dish.main_ingredient_name}</td>
				<td className='dishAction-col'>
					<Button variant='warning' onClick={() => handleEditButton()}>Edit</Button>
					<Button variant='danger' onClick={() => handleDelete(dish)}>Delete</Button>
				</td>
			</>}
			{editMode &&
			<>
				<td className='dishId-col'>{dish.dish_id}</td>
				<td className='dishName-col'>
					<textarea type='text' defaultValue={dish.dish_name} onChange={(event) => setDishName(event.currentTarget.value)} style={{maxWidth: '24vw', wordWrap:'normal'}}></textarea>
				</td>
				<td className='dishMainIngredient-col'>
					<DropdownButton id="dropdown-basic-button" title={dishMainIngredient} onSelect={(eventKey) => setDishMainIngredient(eventKey)}>
					{dIngredientsList.map((item, index) => 
					<Dropdown.Item key={index} eventKey={item}>{item}</Dropdown.Item>
					)}
					</DropdownButton>	
				</td>
				<td className='dishAction-col'>
					<Button variant='secondary' onClick={() => handleEditButton()}>Cancel</Button>
					<Button variant='success' onClick={(event) => handleSaveButton(event)}>Save</Button>
				</td>
			</>
			}
		</tr>
	</>
  )
}
