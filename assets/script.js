//  my api - b735a5eb039f390c27f374f7010e73a3


$(function(){

    $(".btn").click(function(e){
        e.preventDefault(); 

        let city = $('#city-search-input').val(); 
        const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b735a5eb039f390c27f374f7010e73a3"; 

        $.ajax({
            url:queryURL, 
            method: "GET"
        })
        .then(function(response){
            console.log(response)
        })


    })

    let cities; 
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