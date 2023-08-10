import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeAllDishes } from "../reducers/allDishesReducer"
import { Dropdown, DropdownButton, Table } from "react-bootstrap"
import dishService from "../services/dishService"
import { setNotification } from "../reducers/notificationReducer"

export const AdminPage = () => {
	const dispatch = useDispatch()
	const allDishes = useSelector(state => state.allDishes)
	// const dishesKey = Object.keys(allDishes[0])
	useEffect(() => {
		dispatch(initializeAllDishes())
	}, [])

	console.log(allDishes)

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
	
	return (
		<div>
			{/* {allDishes.map((dish, index) => {
				return (
					<li key={index}>{JSON.stringify(dish)}</li>
				)
			})} */}
			<Table striped>
				<thead>
					<tr>
						<th>Dish ID</th>
						<th>Dish Name</th>
						<th>Main Ingredient Name</th>
						<th>Action</th>
						{/* {Object.keys(allDishes[0]).map((header, index) => <th key={index}>{header}</th>)} */}
					</tr>
				</thead>
				<tbody>
					{/* <tr>
						<td>row1</td>
						<td>row2</td>
						<td>row3</td>
					</tr> */}
						{allDishes.map((dish, index) => {
							return (
								<tr key={index}>
									<td>{dish.dish_id}</td>
									<td>{dish.dish_name}</td>
									<td>{dish.main_ingredient_name}</td>
									<td><DropdownButton title='Actions'>
											<Dropdown.Item onClick={() => console.log('clicked edit!')}>Edit</Dropdown.Item>
											<Dropdown.Item onClick={() => handleDelete(dish)}>Delete</Dropdown.Item>
										</DropdownButton></td>
								</tr>
							)
						})}
				</tbody>
			</Table>
		</div>
	)
}