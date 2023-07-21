import { useContext, useState } from "react"
import dishService from "../services/dishService"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { initializeAllMainIngredients } from "../reducers/allMainIngredientsReducer"
import { Form, Button } from "react-bootstrap"

export const AddMainIngredientForm = () => {
	// const [randStr, setRandStr] = useState('')
	const dispatch = useDispatch()
	const [visible, setVisible] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault()
		const newMainIngredient = event.target.newMainIngredient.value
		event.target.newMainIngredient.value = ''
		if (newMainIngredient === '') {
			dispatch(setNotification('Error: must provide new ingredient name!', 3000))
			return
		}
		// console.log(notice)
		// setRandStr(notice)
		try {
			await dishService.addNewMainIngredient(newMainIngredient)
			dispatch(initializeAllMainIngredients())
			dispatch(setNotification(`${newMainIngredient} added to Main Ingredients List!`, 3000))

		} catch (error) {
			console.log(error)
			dispatch(setNotification(`Error adding new main ingredient`, 3000))
		}
	}

	const handleSubmit2 = async (event) => {
		event.preventDefault()
		const newMainIngredient2 = event.currentTarget.newMainIngredient2.value
		event.currentTarget.newMainIngredient2.value = ''
		console.log(newMainIngredient2)
		// if (newMainIngredient === '') {
		// 	dispatch(setNotification('Error: must provide new ingredient name!', 3000))
		// 	return
		// }
		// // console.log(notice)
		// // setRandStr(notice)
		// try {
		// 	await dishService.addNewMainIngredient(newMainIngredient)
		// 	dispatch(initializeAllMainIngredients())
		// 	dispatch(setNotification(`${newMainIngredient} added to Main Ingredients List!`, 3000))

		// } catch (error) {
		// 	console.log(error)
		// 	dispatch(setNotification(`Error adding new main ingredient`, 3000))
		// }
	}

	const handleTogglable = () => {
		setVisible(!visible)
		// dispatch(setNotification(`Visible is set to ${!visible}`, 3000))
		// console.log(visible)
	}

	const buttonText = visible? 'Cancel': 'Add'

	return (
		<div className="add-new-main-ingredient page-element">
			{/* Enter a new main ingredient: */}
			<div>
				{/* Add new ingredient? <button onClick={handleTogglable}>{buttonText}</button>
				<div style={visible? {display:''}: {display: 'none'}}>
				</div> */}
				{/* <form onSubmit={event => handleSubmit(event)}>
					<input name="newMainIngredient"></input>
					<button type="submit">Submit</button>
				</form> */}
			<Form onSubmit={event => handleSubmit2(event)}>
				<Form.Label htmlFor="newMainIngredient2">Enter a new main ingredient:</Form.Label>
				<div className="new-ingredient-input">
					<Form.Control
						type="text"
						id="newMainIngredient2"
						// aria-describedby="passwordHelpBlock"
					/>
					<Button type="submit">Submit</Button>
				</div>
			</Form>

			</div>
		</div>
	)
}