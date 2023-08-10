import React from 'react'
import { Link } from 'react-router-dom'
import MainSelector from './MainSelector'
import { Nav } from 'react-bootstrap'

function NavBar() {
  return (
	<>
		{/* <ul id='nav-list'>
			<li><Link to=''>HOME</Link></li>
			<li><Link to='/addMainIngredient'>Add Main Ingredient</Link></li>
			<li><Link to='/addNewDish'>Add New Dish</Link></li>
		</ul> */}

		<Nav
		defaultActiveKey='/'
		// onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
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