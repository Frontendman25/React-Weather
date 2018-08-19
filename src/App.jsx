import React, { Component } from 'react';

import Titles from './components/Titles.jsx';
import Form from './components/Form.jsx';
import Weather from './components/Weather.jsx';

import './img/bg.jpg';
import './App.css';

const API_KEY = '19d421ff624fac99e55750a7cae5fa0c';

class App extends Component {
	state = {
		temperature: undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		description: undefined,
		error: undefined
	}
	
	getWeather = async (e) => {
		e.preventDefault();
		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;
		const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
		const data = await api_call.json();
		if(city && country){
			this.setState({
				temperature: data.main.temp,
				city: data.name,
				country: data.sys.country,
				humidity: data.main.humidity,
				description: data.weather[0].description,
				error: ''
			});
		}else{
			this.setState({
				temperature: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				error: 'Please enter the values.'
			});
		}
	}
	
  render() {
    return (
			<div className="wrapper">
				<div className="main">
					<div className="container">
						<div className="row">
							<div className="col-md-5 title-container">
								<Titles />
							</div>
							<div className="col-md-7 form-container">
								<Form getWeather={this.getWeather}/>
								<Weather
									temperature={this.state.temperature}
									city={this.state.city}
									country={this.state.country}
									humidity={this.state.humidity}
									description={this.state.description}
									error={this.state.error	}
									/>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default App;