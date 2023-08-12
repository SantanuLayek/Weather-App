let weather = {
    key: "181863394eac23df49a797d97aa73801",
    fetchweather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.key
        ).then((response) => response.json()).then((data) => this.displayweather(data));
    },

    displayweather: function(data) {
        const { name }  = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, humidity, pressure } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, feels_like, humidity, speed, pressure);
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/"+ icon +".png"
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + "\xB0C";
        document.querySelector('.humidity').innerText = "Humidity: "+humidity+"%";
        document.querySelector('.feelslike').innerText ="Feels like "+ feels_like + "\xB0C";
        document.querySelector('.pressure').innerText = "Pressure: "+pressure+" Pa";
        document.querySelector('.wind').innerText = "Wind Speed: "+speed+" km/h";
        document.querySelector('.card').classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
        document.body.style.backgroundSize = "cover";
    },
    search: function() {
        this.fetchweather(document.querySelector("#searchbar").value);
    }
};

document.querySelector('.button').addEventListener('click', function() {
    weather.search();
});

document.querySelector('#searchbar').addEventListener('keyup', function(event) {
    if(event.key == 'Enter'){
        weather.search();
    }
});

weather.fetchweather("Guwahati");