$(document).ready(function() {
    main();

    function main() {
        $('#search-form').on('submit', (e) => {
            e.preventDefault();
            $('#error-msg').text('');
            const baseURL = 'http://api.weatherapi.com/v1/current.json?key=';
            const API_KEY='31f0646d9b0e448fb17131238232006';
            const query = '&q='
            const location = $('#location-input')[0].value;
            const queryURL = baseURL + API_KEY + query + location;
            const useLiveData = false;
            const cachedData = sampleData

            if (useLiveData) {
                fetch(queryURL)
                    .then((res) => res.json())
                    .then((liveData) => {
                        if (!liveData.hasOwnProperty('error')) {
                            appendWeatherData(liveData);
                        } else {
                            console.log(liveData);
                            $('#error-msg').text(liveData.error.message);
                        }
                    })
            } else {
                appendWeatherData(cachedData);
            }
        })

    }

    function appendWeatherData(data) {
        $('#location').text(data.location.name);
        $('#temperature').text(data.current.temp_f);
    }
});

const sampleData = {
    "location": {
        "name": "London",
        "region": "City of London, Greater London",
        "country": "United Kingdom",
        "lat": 51.52,
        "lon": -0.11,
        "tz_id": "Europe/London",
        "localtime_epoch": 1687355731,
        "localtime": "2023-06-21 14:55"
    },
    "current": {
        "last_updated_epoch": 1687355100,
        "last_updated": "2023-06-21 14:45",
        "temp_c": 23.0,
        "temp_f": 73.4,
        "is_day": 1,
        "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
            "code": 1003
        },
        "wind_mph": 10.5,
        "wind_kph": 16.9,
        "wind_degree": 240,
        "wind_dir": "WSW",
        "pressure_mb": 1016.0,
        "pressure_in": 30.0,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 53,
        "cloud": 50,
        "feelslike_c": 24.1,
        "feelslike_f": 75.3,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "uv": 7.0,
        "gust_mph": 10.1,
        "gust_kph": 16.2
    }
}