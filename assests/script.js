var searchFormEl = document.querySelector('#search-form');
var lat = 0;
var lon = 0;
var tempTest =[];

function handleSearchFormSubmit(event){
    event.preventDefault();


    var searchInputVal = document.querySelector('#search-input').value;

    localStorage.setItem('city', searchInputVal);
    
    if(!searchInputVal){
        return;
    }

    var apiUrl
    = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInputVal + "&limit=5&appid=a14ace2b2c6252a8f47e6628c07badaa";

    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    lat = data[0].lat;
                    lon = data[0].lon;
                });
            }
        })
        getWeather(lat, lon);

}

function getWeather(lat, lon){
    var x = 0;
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=a14ace2b2c6252a8f47e6628c07badaa&units=imperial";
    fetch(apiUrl)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                for(var i =0; i < 5; i++){
                    tempTest = data.list[x].main.temp
                    x = x+8;
                }
            })
        }
    })
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);