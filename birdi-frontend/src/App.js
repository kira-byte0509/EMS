import logo from './logo.svg';
import React,{useEffect} from 'react'
import './App.css';
import axios from 'axios'
import {Grid} from 'semantic-ui-react';
import AppLayout from './layout/AppLayout';
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css';

const App = () => {

	return (
		<Grid columns={1}>
			
			<Grid.Column width={16}>
				<AppLayout/>
			</Grid.Column>
			
		</Grid>
	);
}

export default App;
