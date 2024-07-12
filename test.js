const url="https://swd.weatherflow.com/swd/rest/observations/station/136540";

const currentUrl = new URL(window.location.href);
//search for ?token=[token]
currentUrl.searchParams.get('token');
//return with currentUrl.search
//set API request URL
const request = url+currentUrl.search;
//set interested metrics

const temp = 'air_temperature';
const humidity = 'relative_humidity'


//if there is a token in the URL, perform API call
if(currentUrl.search !== ""){
    fetch(request)
    .then(response => response.json())
    .then(data => {
        // Handle the data here

        
        let numTemp = data.obs[0][temp];
        let numHum = data.obs[0][humidity];
        console.log('Temp: ' + numTemp.toFixed(2));
        console.log('Temp F: ' + celcToFahr(numTemp).toFixed(2));
        console.log('Humidity: ' + numHum + '%');
        console.log('Heat Index: ' + heatIndex((celcToFahr(numTemp)),numHum).toFixed(2));
        
    })
}

//helper functions
//convert celcius to farenheit
function celcToFahr( n ) {
    return ((n * 9.0 / 5.0) + 32.0);
}
//NWS formula for heat index: https://www.weather.gov/media/epz/wxcalc/heatIndex.pdf
function heatIndex(T,RH){
    return (-42.379 + 2.04901523*T + 10.14333127*RH - .22475541*T*RH - .00683783*T*T - .05481717*RH*RH + .00122874*T*T*RH + .00085282*T*RH*RH - .00000199*T*T*RH*RH)
}