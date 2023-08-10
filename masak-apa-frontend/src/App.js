import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddMainIngredientForm } from './components/AddMainIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { initializeDistinctMainIngredientsList } from './reducers/distinctMainIngredientsListReducer';
import { initializeSelectedMainIngredient, setSelectedMainIngredient } from './reducers/selectedMainIngredientReducer';
import { initializeRandomDish, getRandomDish, setRandomDish } from './reducers/randomDishReducer';
import dishService from './services/dishService';
import { AddNewDishForm } from './components/AddNewDishForm';
import Notification from './components/Notification';
import { initializeAllMainIngredients } from './reducers/allMainIngredientsReducer';
import MainSelector from './components/MainSelector';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Root from './routes/root';
import { Navbar, Nav } from 'react-bootstrap';
import { AdminPage } from './components/AdminPage';
import { initializeAllDishes } from './reducers/allDishesReducer';



function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		const runFirst = async () => {
			dispatch(initializeDistinctMainIngredientsList())
			dispatch(initializeSelectedMainIngredient())
			dispatch(initializeRandomDish())
			dispatch(initializeAllMainIngredients())
			dispatch(initializeAllDishes())
		}
		runFirst()

	}, [dispatch])

	useEffect(() => {document.title = `Masak Apa Hari Ini?`})

	return (
		<BrowserRouter>
			<div className="App">
				<NavBar></NavBar>
				<Notification></Notification>
				<div className='container'>
					<Routes>
							<Route path='/' element={<MainSelector></MainSelector>}/>
							<Route path='/addMainIngredient' element={<AddMainIngredientForm></AddMainIngredientForm>}></Route>
							<Route path='/addNewDish' element={<AddNewDishForm></AddNewDishForm>}></Route>
							<Route path='/admin' element={<AdminPage></AdminPage>}></Route>
							<Route path='*' element={<MainSelector></MainSelector>}></Route>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
  );
}

export default App;
