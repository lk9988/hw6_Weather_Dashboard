//  my api - b735a5eb039f390c27f374f7010e73a3


$(function(){

    // getting array for pastCitySearch in localStorage or empty array if there is none 
    let pastCityList = JSON.parse(localStorage.getItem('pastCitySearch')) || []; 

    if (pastCityList.lenth > 0 ) { 
        // if there is any city in pastCityList array, 
        pastCityList.forEach(function(city){
            // // Loop thru forEach item in array and 
            // let aCity = `<a class="list-group-item list-group-item-action" href="#list-item-5"> 
            //                 Item5 </a>`; 
            // $().append(aCity); 
            // creat HTML element and render
        })
    }

    // ***** FUNCTION adding input city to pasrCityList array 
    function addToLocalStorage (city) { 
        pastCityList.push(city); 
        let citySting = JSON.stringify(pastCityList); 
        //Converts a JavaScript value (pastCityList) to a JSON string.
        localStorage.setItem('pastCitySearch' , citySting); 
        // and set it to localStorage array/pastCitySearch 
    }

//     $(".btn").click(function(e){
//         e.preventDefault(); 

//         let city = $('#city-search-input').val(); 
//         const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" b735a5eb039f390c27f374f7010e73a3"; 
//         // used Imperial for measurement unit 
//         $.ajax({
//             url:queryURL, 
//             method: "GET"
//         })
//         .then(function(response){
//             console.log(response)
//             console.log(response.name)
//             console.log(response.main.temp)
//             console.log(response.main.humidity)
//             console.log(response.wind.speed)
//             console.log(response.weather[0].icon)
//             // UV index is with lat & lon only? 
           
//             $('#cityName').text( response.name + response.dt ); 
//             $('#cityTemp').text( "Temperature: " + response.main.temp + " °F" )
//             $('#cityHumidity').text( "Humidity: " + response.main.humidity )
//             $('#cityWindspeed').text( "Wind Speed: " + response.wind.speed + "unit")
            
//         })

    const myAPI = "b735a5eb039f390c27f374f7010e73a3"; 

//     })
 // create FUNCTION for displaying cityweather -> later pass on click  $ for enter
    function cityWeather() { 
        // need to empty before appending new one 

        let city = $('#city-search-input').val().trim(); 
        // this will only get city value from userINPUT // need to change for Local Storage
        const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + myAPI; 
        // used Imperial for measurement unit 
        $.ajax({
            url: queryURL, 
            method: "GET"
        })
        .then(function(response){
            console.log(response)
            // console.log(response.descrip)
           
            console.log(response.weather[0].icon)
            // UV index is with lat & lon only? 
            console.log(response.coord.lat); 
            console.log(response.coord.lon); 

            
            // dinamically creating HTML ****************   NEED TO GET TIME & ICON
            const cityWeatherDisplay = `
            <h5> ${ response.name } ${ response.dt}  </h5>
            <p> Description: ${ response.weather[0].main } </p>
            <p> Temperature: ${ response.main.temp } </P>
            <p> Humidity: ${ response.main.humidity } % </p>
            <p> Wind Speed: ${ response.wind.speed } MPH </P>
            `
            $('#city-weather-display').append(cityWeatherDisplay); 
            // appeding to HTML
            // const lat = (response.coord.lat); 
            // const lon = (response.coord.lon); 
            // const lat = parseInt(response.coord.lat); 
            const lat = response.coord.lat; 
            const lon = response.coord.lon; 

            getUV(lat, lon); 
            console.log('qhat' , lat); 


        })
    }

    function getUV(lat, lon){ 

        const uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + myAPI; 

        $.ajax({
            url: uvURL, 
            method: "GET"
        })
        .then(function(response){
            console.log(response); 
            console.log(response[0].value); 

            //got UV index!!

        })




        

    }




    
    // seatch button click 
    $('.btn').click(cityWeather); 
    $('.btn').click(function (){
        let newCity = $('#city-search-input').val().trim(); 
        addToLocalStorage(newCity); 
    }); 


    
    // creat array for city searched and stored in localST
    // initial array would be empty 

    // need to gather search input from user and get store it localST 
    // 


    // creating function that will display weather with user input 
    // function displayCityWeather(){ 

        // const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b735a5eb039f390c27f374f7010e73a3"; 
        // const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b735a5eb039f390c27f374f7010e73a3"; 
        // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

        // api.openweathermap.org/data/2.5/find?q=London&units=imperial -> For temperature in Fahrenheit use units=imperial



        // need to create AJAX call to get weatherinfo 
        // need to change html id with _ instead of - -> will use id here instead of creating vars

        // 
        // $.ajax({
        //     url:queryURL, 
        //     method: "GET"
        // })
        // .then(function(response){
        //     console.log(response)
        // })
    // }


    console.log('what'); 









})