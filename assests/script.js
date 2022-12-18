var searchFormEl = document.querySelector('#search-form');
var fiveDay = document.querySelector('#five-day');
var today = document.querySelector('#today');
var search = document.querySelector("#search");
var cityButton = document.querySelector('#cityButton');
var lat = 0;
var lon = 0;
var aButton = [];
if(localStorage.getItem('city')){
    aButton = JSON.parse(localStorage.getItem('city'));
}


function handleSearchFormSubmit(event){
    event.preventDefault();
    $('#search').empty();
    $('#five-day').empty();

    var searchInputVal = document.querySelector('#search-input').value;
    display(searchInputVal);
    var result =testRepeat(searchInputVal);
    if(result == 0 ){
        aButton.push(searchInputVal);
        localStorage.setItem('city', JSON.stringify(aButton));
        buttonSetUp();
    }
    else{
        buttonSetUp(); 
    }
    if(!searchInputVal){
        return;
    }

}

function getWeather(lat, lon){
    $('#search').empty();
    $('#five-day').empty();  
    buttonSetUp();
    var x = 3;
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=a14ace2b2c6252a8f47e6628c07badaa&units=imperial";
    fetch(apiUrl)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                for(var i =0; i < 5; i++){
                    var date = data.list[x].dt_txt.split(' ')[0];
                    var card = document.createElement('div');
                    card.classList.add('card');
                    var time = document.createElement('p');
                    time.innerHTML = 
                    '<strong>' + date.split('-')[1]+'/'+date.split('-')[2]+'/'+date.split('-')[0]+ '</strong>';
                    var icon = document.createElement('p');
                    icon.innerHTML = 
                    '<img src = "https://openweathermap.org/img/wn/' + data.list[x].weather[0].icon+ '@2x.png" alt ="icon">';
                    var temp = document.createElement('P');
                    temp.innerHTML =
                    'Temp: '+ data.list[x].main.temp + 	'&#8457;';
                    var wind = document.createElement('p');
                    wind.innerHTML =
                    'Wind: '+ data.list[x].wind.speed +" MPH";
                    var humidity = document.createElement('p');
                    humidity.innerHTML =
                    "Humidity: " + data.list[x].main.humidity + "%";
                    card.append(time, icon,temp, wind, humidity);
                    fiveDay.append(card);
                    x = x+8;
                }
            })
        }
    })
}
/*function getToday(lat, lon){
    var apiUrl =
    "https://api.openweathermap.org/data/3.0/onecall?lat="+lat+"&lon="+lon+"&appid=571cedbbc3e4d8b8a1ada9c2e332a9c8"
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    date = data.list.dt_txt;
                    console.log(data);
                    var time =document.createElement('p');
                    time.innerHTML =
                    '<strong>test</strong>'; 
                })
            }              
        })
 
}*/


function buttonSetUp(){
    if(aButton){
        for(var i = 0; i < aButton.length; i++){
            var button = document.createElement('button');
            button.classList.add('btn')
            button.innerHTML = aButton[i];
            test = aButton[i];
            button.onclick = (function(test){
                return function(){
                    $('#search').empty();
                    $('#five-day').empty();
                    display(test);
                }
            })(aButton[i])
            search.append(button);
        }
    }
}

function display(searchInputVal){
    var apiUrl
    = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInputVal + "&limit=5&appid=a14ace2b2c6252a8f47e6628c07badaa";
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){

                    lat = data[0].lat;
                    lon = data[0].lon;
                    getWeather(lat, lon);
                   // getToday(lat, lon);
                   localStorage.setItem(searchInputVal, searchInputVal);
                });
            }
        })
}
function testRepeat(searchInputVal){
    
    if(aButton){
        for(var i =0; i < aButton.length; i++){
            if(searchInputVal == aButton[i]){
                return 1;
            }
            if(searchInputVal == ""){
                return 1;
            }
        }
        return 0;   
    }
    return 0;
}


buttonSetUp();


searchFormEl.addEventListener('submit', handleSearchFormSubmit);
