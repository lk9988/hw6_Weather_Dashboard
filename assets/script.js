$(function () {
	// $('.form-group').on('submit' , function(e){
	//     e.preventDefault();
	// })

	const myAPI = 'b735a5eb039f390c27f374f7010e73a3';
	//***** GET pastCitySearch from localStorage and set as object variable
	// if empty, set as empty array
	let pastCityList = JSON.parse(localStorage.getItem('pastCitySearch')) || [];

	if (pastCityList.length > 0) {
		// if pastCityList array's length > 0 true,
		for (i = 0; i < pastCityList.length; i++) {
			// for each index of array,
			const pastDisplayBtn = $(`<button type="button" data-name ="${pastCityList[i]}" class="button list-group-item list-group-item-action"> 
                ${pastCityList[i]} </button>`);
			// dynamically  create buttons
			$('#past-search').prepend(pastDisplayBtn);
			// insert HTML element in most recent order.
		}

		// console.log(pastCityList);
	}

	//***** FUNCTION for displaying cityweather
	function cityWeather(city) {
		// empty before appending new one
		$('#city-weather-display').empty();
		$('#5-day-forecast-display').empty();
		// $('#uvi').removeClass();

		const queryURL =
			'https://api.openweathermap.org/data/2.5/weather?q=' +
			city +
			'&units=imperial&appid=' +
			myAPI;
		// used Imperial API for measurement unit
		$.ajax({
			url: queryURL,
			method: 'GET',
		}).then(function (response) {
			const weatherIcon = response.weather[0].icon;
			const iconURL =
				'https://openweathermap.org/img/wn/' + weatherIcon + '.png';
			// console.log(iconURL)
			const date = moment.unix(response.dt).format('MM/DD/YYYY');
			// converting unix time format from API data using MOMENT

			const cityWeatherDisplay = `
                <h5> <b> ${response.name} </b> <span> (${date}) </span> <img src = "${iconURL}"> </h5>
                <p> Description: ${response.weather[0].main} </p>
                <p> Temperature: ${response.main.temp}   °F </P>
                <p> Humidity: ${response.main.humidity} % </p>
                <p> Wind Speed: ${response.wind.speed} MPH </P>
                `;
			// dynamically creating HTML element

			$('#city-weather-display').append(cityWeatherDisplay);
			// appeding to HTML
			const lat = response.coord.lat;
			const lon = response.coord.lon;
			// get data for next API call and pass

			getUV(lat, lon);
			// console.log(lat);
			getFiveDays(lat, lon);
		});
	}
	//***** FUNCTION for get UV index by using data from previous API call, and pass them to new API call
	function getUV(lat, lon) {
		const uvURL =
			'https://api.openweathermap.org/data/2.5/onecall?lat=' +
			lat +
			'&lon=' +
			lon +
			'&units=imperial&appid=' +
			myAPI;
		// new API call, using ONE CALL API which requires lat, lon data
		$.ajax({
			url: uvURL,
			method: 'GET',
		}).then(function (response) {
			// console.log(response);

			const uvIndex = response.current.uvi;
			// get uvIndex data
			const uvDispay = `<p> UV Index: <span id = "uvi"> ${uvIndex} </span> </p>`;
			// creating HTML element dynamically
			$('#city-weather-display').last().append(uvDispay);
			// append it to HTML element as last child
			const uvSpan = document.getElementById('uvi');
			// console.log(uvIndex , 'uvindex')
			// $('#uvi').text(uvIndex); -> worked, but changed because addclass method wasn't working

			// 1-2 Low green , 3-5 yellow Moderate  , 6-7 High orage , 8-10 Red Very High , 11+ Purple Extreme
			if (uvIndex < 3) {
				// $('#uvi').addClass("text-white bg-success"); -> this wasn't working.
				uvSpan.setAttribute('class', 'text-white bg-success');
				// setting newly created span's class with bootstrap class for changing bg and text color
			} else if (uvIndex >= 3 && uvIndex < 6) {
				// $('#uvi').addClass("text-white bg-warning");
				uvSpan.setAttribute('class', 'text-white bg-warning');
			} else if (uvIndex >= 6 && uvIndex < 8) {
				// $('#uvi').addClass("text-white bg-orange");
				uvSpan.setAttribute('style', 'text-white bg-orange');
				// uvSpan.style.backgroundColor = "orange";
				// uvSpan.style.color= "white"
				// bg-orange does not exist in bootstrap. add additional css
			} else if (uvIndex >= 8 && uvIndex < 11) {
				// $('#uvi').addClass("text-white bg-danger");
				uvSpan.setAttribute('class', 'text-white bg-danger');
			} else if (uvIndex > 11) {
				// $('#uvi').addClass("text-white bg-purple");
				uvSpan.setAttribute('class', 'text-white bg-purple');
				// bg-purple does not exist in bootstrap. add additional css
			}

			// $('#city-weather-display').last().append(uvDispay);
			// moved to top since this will not work with setting attribute method before appending
		});
	}
	//***** FUNCTION for getting 5-day forecast using data from first API call and past them to new API call
	function getFiveDays(lat, lon) {
		const uvURL =
			'https://api.openweathermap.org/data/2.5/onecall?lat=' +
			lat +
			'&lon=' +
			lon +
			'&units=imperial&appid=' +
			myAPI;
		// ONE-CALL API
		$.ajax({
			url: uvURL,
			method: 'GET',
		}).then(function (response) {
			for (i = 1; i < 6; i++) {
				// only need 5 days
				const forecastDate = moment
					.unix(response.daily[i].dt)
					.format('MM/DD/YYYY');
				//formatting unix time to reqular with MOMENT
				const forecaseIcon = response.daily[i].weather[0].icon;
				const forecaseIconURL =
					'https://openweathermap.org/img/wn/' + forecaseIcon + '@2x.png';
				// getting icon for forecast
				const forecastDisplay = `
                    <div class="col-sm-4">
                        <div class="card" >
                        <div class="card-body bg-primary text-white rounded">
                        <h4 class="card-title"> ${forecastDate} </h4>
                        <img class="card-text" src = "${forecaseIconURL}">
                        <p class="card-text">Temp: ${response.daily[i].temp.day}  °F </p>
                        <p class="card-text">Humidity: ${response.daily[i].humidity}   %</p>
                    </div>
                  </div>
                </div>`;
				// creating HTML element dynamically
				$('#5-day-forecast-display').append(forecastDisplay);
				// append to HTML element
			}
		});
	}

	//***** WHEN searchButton is clicked,
	$('#search-btn').on('click', function (e) {
		e.preventDefault();
		// preventing default action of form
		const newCity = $('#city-search-input').val().trim().toUpperCase();
		// getting userInput and change it to uppercase letter
		if (!pastCityList.includes(newCity) && newCity !== '') {
			// if pastCityList array does not have newCity input and newCity input value is not empty
			const newCityBtn = $(`<button type="button" data-name = "${newCity}" class="button list-group-item list-group-item-action"> 
					${newCity} </button>`);
			// dynamically create button with newCity name
			$('#past-search').prepend(newCityBtn);
			// insert newly created button as first on the button list
			pastCityList.push(newCity);
			// PUSH newCity to pastCityList array
			localStorage.setItem('pastCitySearch', JSON.stringify(pastCityList));
			// change pastCityList object to string and set it with pastCitySearch as key in localStorage
		}
		cityWeather(newCity);
		// get newCity and pass it to cityWeather function
	});
	// changed button type from button to submit abling enterkey  submit !!!

	//***** WHEN all buttons in past-search element is clicked,
	$('#past-search').on('click', 'button', function () {
		const cityClicked = $(this).data('name');
		// get data-name value for button clicked
		// console.log(this);
		cityWeather(cityClicked);
		// pass data-name value to cityWeather function
	});

	//***** WHEN clear-btn is clicked */
	$('#clear-btn').on('click', function () {
		localStorage.removeItem('pastCitySearch');
		// remove all items from localstorage
		$('#past-search').empty();
		$('#city-weather-display').empty();
		$('#5-day-forecast-display').empty();
		// clear all rendered HTML elements
	});
});
