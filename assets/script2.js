


$(function(){
    $('.form-group').on('submit' , function(e){
        e.preventDefault(); 
    })
    
        const myAPI = "b735a5eb039f390c27f374f7010e73a3"; 

        let pastCityList = JSON.parse(localStorage.getItem('pastCitySearch')) || []; 
        
        if ( pastCityList.length > 0 ) {
            for ( i = 0; i < pastCityList.length ; i++) {

                const pastDisplayBtn = $(`<button type="button" data-name ="${pastCityList[i]}" class="button list-group-item list-group-item-action"> 
                ${pastCityList[i]} </button>`); 
                $('#past-search').prepend(pastDisplayBtn); 

                
            }
            
            console.log(pastCityList); 
        }
    
  
     // create FUNCTION for displaying cityweather 
        function cityWeather(city) { 
            // empty before appending new one 
            $('#city-weather-display').empty(); 
            $('#5-day-forecast-display').empty(); 
            $('#uvi').removeClass(); 
            

    
            const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + myAPI; 
            // used Imperial for measurement unit 
            $.ajax({
                url: queryURL, 
                method: "GET"
            })
            .then(function(response){
                console.log(response)
                // console.log(response.descrip)
               
                console.log(response.weather[0].icon); 
                console.log(response.coord.lat); 
                console.log(response.coord.lon); 
                
                const weatherIcon = response.weather[0].icon;

                const iconURL=  "https://openweathermap.org/img/wn/" + weatherIcon + ".png"
                console.log(iconURL)
                const date = moment.unix(response.dt).format('MM/DD/YYYY'); 
                console.log(date); 
                
                // dinamically creating HTML 
                
                const cityWeatherDisplay = `
                <h5> ${ response.name } <span> (${ date }) </span> <img src = "${iconURL}"> </h5>
                <p> Description: ${ response.weather[0].main } </p>
                <p> Temperature: ${ response.main.temp }   °F </P>
                <p> Humidity: ${ response.main.humidity } % </p>
                <p> Wind Speed: ${ response.wind.speed } MPH </P>
                `
                
                $('#city-weather-display').append(cityWeatherDisplay); 
                // appeding to HTML
                const lat = (response.coord.lat); 
                const lon = (response.coord.lon); 
                // const lat = parseInt(response.coord.lat); 
    
                getUV(lat, lon); 
                // console.log(lat); 
                getFiveDays(lat, lon); 
    
            })
        }
    
        function getUV(lat, lon){ 
    
            const uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + myAPI; 
    
            $.ajax({
                url: uvURL, 
                method: "GET"
            })
            .then(function(response){
                console.log(response); 

    
                console.log(response.current.uvi); 
                
                const uvIndex = response.current.uvi; 
                const uvDispay = `<p> UV Index: <span id = "uvi"> ${ uvIndex } </span> </p>`
                console.log(uvIndex , 'uvindex')
                // $('#uvi').text(uvIndex); 
               

                $('#uvi').removeClass(); 
                
                // 1-2 Low green , 3-5 yellow Moderate  , 6-7 High orage , 8-10 Red Very High , 11+ Purple Extreme 
                // THIS IS NOT WORKING 
                // SOMETHNG IS NOT RIGHT
                if ( uvIndex < 3 ) {
                    $('#uvi').addClass("text-white bg-success"); 
                } 
                else if( uvIndex >= 3 && uvIndex < 6  ){
                    $('#uvi').addClass("text-white bg-warning"); 
                }
                else if( uvIndex >= 6 && uvIndex< 8  ){
                    $('#uvi').addClass("text-white bg-orange"); 

                }
                else if( uvIndex >= 8 && uvIndex < 11  ){
                    $('#uvi').addClass("text-white bg-danger"); 
                }
                else if( uvIndex > 11  ){
                    $('#uvi').addClass("text-white bg-purple"); 
                }

                $('#city-weather-display').last().append(uvDispay); 
    
            })
    
        }
    
        function getFiveDays(lat, lon){
            
            const uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + myAPI; 
    
            $.ajax({
                url: uvURL, 
                method: "GET"
            })
            .then(function(response){

                for (i = 1; i < 6 ; i++ ){

                    const forecastDate = moment.unix(response.daily[1].dt).format('MM/DD/YYYY');
                    const forecaseIcon = response.daily[0].weather[0].icon; 
                    const forecaseIconURL =  "https://openweathermap.org/img/wn/" + forecaseIcon + "@2x.png"
                    const forecastDisplay = `
                    <div class="col-sm-4">
                        <div class="card" >
                        <div class="card-body bg-primary text-white rounded">
                        <h4 class="card-title"> ${forecastDate} </h4>
                        <img class="card-text" src = "${ forecaseIconURL}">
                        <p class="card-text">Temp: ${ response.daily[0].temp.day }  °F </p>
                        <p class="card-text">Humidity: ${response.daily[0].humidity}   %</p>
                    </div>
                  </div>
                </div>`
                    $('#5-day-forecast-display').append(forecastDisplay)

                }
                // const forecasedate = moment.unix(response.daily[1].dt).format('MM/DD/YYYY');
                // console.log(forecastdate) 
                console.log(response.daily[0].dt)

                console.log(response.daily[0].weather[0].icon); 
                console.log(response.daily[0].temp.day); 
                console.log(response.daily[0].humidity); 

            })

        }

    
    
        
        // seatch button click 
        // $(".btn").click(cityweather); 
        $('#search-btn').on('click', function(e){
            e.preventDefault(); 
            
            const newCity = $('#city-search-input').val().trim().toUpperCase(); 
            
            if (!pastCityList.includes(newCity) && newCity !== ""){

                const newCityBtn = $(`<button type="button" data-name = "${newCity}" class="button list-group-item list-group-item-action"> 
                    ${newCity} </button>`); 
                $('#past-search').first().append(newCityBtn); 
                pastCityList.push(newCity); 
                localStorage.setItem('pastCitySearch', JSON.stringify(pastCityList)); 

            }
            cityWeather(newCity); 
        })
        // changed button type from button to submit abling enterkey  submit !!! 


        $('#past-search').on('click' , 'button' , function(){
            const cityClicked = $(this).data('name'); 
            console.log(this); 
            cityWeather(cityClicked); 
            console.log(cityClicked , '168')
        })

        

    
        console.log('what'); 
    
    
    
    
    
    
    
    
})