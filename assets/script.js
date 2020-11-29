//  my api - b735a5eb039f390c27f374f7010e73a3


$(function(){

    // getting array for pastCitySearch in localStorage or empty array if there is none 
    let pastCityList = JSON.parse(localStorage.getItem('pastCitySearch')) || []; 
  
    // if (pastCityList.length > 0 ) { 
    //     // if there is any city in pastCityList array, 
    //     pastCityList.forEach(function(past){
    //         // Loop thru forEach item in array and 
    //         console.log(past)
    //         const pastDisplayBtn = $(`<button type="button" class="list-group-item list-group-item-action"> 
    //             ${past} </button>`); 
            
    //         $('#past-search').append(pastDisplayBtn); 
    //         // render to HTML
    //     })
    // }

        // seatch button click 
    // $('.btn').click(cityWeather); 
    $('.btn').click(function(){
        
        let newCity = $('#city-search-input').val().trim(); 
        
        cityWeather(newCity); 

        
        if (pastCityList.indexOf(newCity) === -1  ||  newCity  !== "") {
            pastCityList.push(newCity); 
        }
       
        if (pastCityList.length > 0 || !pastCityList.includes(newCity) ) { 
            // if there is any city in pastCityList array, 
            pastCityList.forEach(function(newCity){
                // Loop thru forEach item in array and 
                
                const pastDisplayBtn = $(`<button type="button" class="button list-group-item list-group-item-action"> 
                    ${newCity} </button>`); 
                
                $('#past-search').append(pastDisplayBtn); 
                // render to HTML
            })
        }
        addToLocalStorage(newCity); 

    }); 

    

    // ***** FUNCTION adding input city to pasrCityList array 
    function addToLocalStorage () { 
        // pastCityList.push(city); 
        let citySting = JSON.stringify(pastCityList); 
        //Converts a JavaScript value (pastCityList) to a JSON string.
        localStorage.setItem('pastCitySearch' , citySting); 
        // and set it to localStorage array/pastCitySearch 
    }




    const myAPI = "b735a5eb039f390c27f374f7010e73a3"; 

//     })
 // create FUNCTION for displaying cityweather -> later pass on click  $ for enter
//  let city = $('#city-search-input').val().trim(); 
    function cityWeather(newCity) { 
        // need to empty before appending new one 

        // let city = $('#city-search-input').val().trim(); 
        // this will only get city value from userINPUT // need to change for Local Storage
        const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&units=imperial&appid=" + myAPI; 
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
            let weatherIcon = response.weather[0].icon; 
            iconURL=  "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            // iconURL = "http://openweathermap.org/img/wn/10d@2x.png"


            
            // dinamically creating HTML ****************   NEED TO GET TIME & ICON
            const cityWeatherDisplay = `
            <h5> ${ response.name } <span> ${ response.dt} </span> <img src = iconURL> </h5>
            <p> Description: ${ response.weather[0].main } </p>
            <p> Temperature: ${ response.main.temp }  °F </P>
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