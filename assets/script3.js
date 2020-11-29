$(function(){


  
    $('btn').click(function(){

        let newCity = $('#city-search-input').val().trim(); 

        getCityWeather(newCity); 
        console.log(newCity); 
    })


    const myAPI = "b735a5eb039f390c27f374f7010e73a3"; 

    function getCityWeather(newCity){

        const queryURLCurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&units=imperial&appid=" + myAPI; 

        $.ajax({
            url:queryURLCurrent, 
            method: "GET"
        })
        .then(function(response){
            console.log(response); 

        })
    }

console.log(getCityWeather); 
 console.log('what'); 




})