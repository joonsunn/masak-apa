import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeAllDishes } from "../reducers/allDishesReducer"
import { Dropdown, DropdownButton, Table } from "react-bootstrap"
import dishService from "../services/dishService"
import { setNotification } from "../reducers/notificationReducer"
import { AdminTableRow } from "./AdminTableRow"

export const AdminPage = () => {
	const dispatch = useDispatch()
	const allDishes = useSelector(state => state.allDishes)
	useEffect(() => {
		dispatch(initializeAllDishes())
	}, [])
	
	return (
		<div>
			<Table striped className="admin-table">
				<thead>
					<tr>
						<th className='dishId-col'>Dish ID</th>
						<th className='dishName-col'>Dish Name</th>
						<th>Main Ingredient Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{allDishes.map((dish, index) => {
						return (
							<AdminTableRow dish={dish} key={index}></AdminTableRow>
						)
					})}
				</tbody>
			</Table>
		</div>
	)
}