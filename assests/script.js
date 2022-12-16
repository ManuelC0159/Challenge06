var searchFormEl = document.querySelector('#search-form');
var fiveDay = document.querySelector('#five-day');
var lat = 0;
var lon = 0;
var tempTest =[];
var wind = [];
var humidity = [];

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
                    var date = data.list[x].dt_txt.split(' ')[0];
                    var card = document.createElement('div');
                    card.classList.add('card');
                    var body = document.createElement('p');
                    body.innerHTML = 
                    '<strong>' + date.split('-')[1]+'/'+date.split('-')[2]+'/'+date.split('-')[0]+ '</strong>';
                    
                    card.append(body);
                    fiveDay.append(card);
                    tempTest = data.list[x].main.temp
                    x = x+8;
                }
            })
        }
    })
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);