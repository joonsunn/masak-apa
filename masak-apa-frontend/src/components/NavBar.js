import React from 'react'
import { Link } from 'react-router-dom'
import MainSelector from './MainSelector'
import { Nav } from 'react-bootstrap'

function NavBar() {
  return (
	<>
		<Nav
		defaultActiveKey='/'
		variant='underline'
		className='navbar'>
			<Nav.Item>
				<Nav.Link as={Link} to='/'>Home</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link as={Link} to='/addMainIngredient'>Add Main Ingredient</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link as={Link} to='/addNewDish'>Add New Dish</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link as={Link} to='/admin'>Admin Page</Nav.Link>
			</Nav.Item>
    	</Nav>
	</>
  )
}

export default NavBar