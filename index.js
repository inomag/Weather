const body = document.querySelector('body');
/*Search Bar*/
const place = document.getElementById('location');
const search = document.querySelector('#searchbtn');
/*Present Temperature and Climate*/
const currentIcon = document.querySelector('#presentLogo');
const currentTemp = document.querySelector('#presentTemp');
const currentData = document.querySelectorAll('div.infoData>p');
const currentDate = document.querySelector('div.infoDate>p:nth-of-type(1)');
const currentClimate = document.querySelector('div.infoDate>p:nth-of-type(2)');
/*Forecast Temperature and Climate*/
const futureIcon = document.querySelectorAll('div.day>i');
const futureDate = document.querySelectorAll('div.day>p:nth-of-type(1)');
const max = document.querySelectorAll('div.day>p:nth-of-type(2)');
const min = document.querySelectorAll('div.day>p:nth-of-type(3)');

const logos = [
    {
        codes: [1066,1114,1210,1213,1216,1219,1222,1225,1255,1258],
        logo: "fas fa-snowflake"
    },
    {
        codes: [1135,1147],
        logo: "fas fa-smog"
    },
    {
        codes: [1237,1261,1264],
        logo: "fas fa-cloud-meatball"
    },
    {
        codes: [1087,1273,1276,1279,1282],
        logo: "fas fa-bolt"
    },
    {
        codes: [1186,1189,1192,1195,1198,1201,1243,1246,1249],
        logo: "fas fa-cloud-showers-heavy"
    },
    {
        codes: [1069,1072,1180,1183,1240],
        logo: "fas fa-cloud-rain"
    },
    {
        codes: [1063,1150,1153],
        logo: "fas fa-cloud-sun-rain"
    },
    {
        codes: [1009,1006],
        logo: "fas fa-cloud"
    },
    {
        codes: [1003],
        logo: "fas fa-cloud-sun"
    },
    {
        codes: [1000],
        logo: "fas fa-sun"
    },
    {
        codes: [1168, 1171, 1204, 1207, 1252],
        logo: "fas fa-water"
    }
];



search.addEventListener('click', () => {
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=cc2dec0cc6f2456eada82107201511&q=${place.value}&days=7`)
    .then((response) => {
        console.log(response);
    setLogo(response.data.current.condition.code, currentIcon);
    currentClimate.innerText = response.data.current.condition.text;
    currentDate.innerText = response.data.current.last_updated;
    currentTemp.innerText = `${response.data.current.temp_c}\u00b0C`;
    currentData[0].innerText = `Precipitation: ${response.data.current.precip_mm} mm`;
    currentData[1].innerText = `Humidity: ${response.data.current.humidity}`;
        currentData[2].innerText = `Wind: ${response.data.current.wind_kph} km/hr`;
        for (let i = 0; i < futureIcon.length; i++){
            setLogo(response.data.forecast.forecastday[i+1].day.condition.code, futureIcon[i]);
            futureDate[i].innerText = response.data.forecast.forecastday[i+1].date;
            max[i].innerText = `${response.data.forecast.forecastday[i+1].day.maxtemp_c}\u00b0C`;
            min[i].innerText = `${response.data.forecast.forecastday[i+1].day.mintemp_c}\u00b0C`;
        }  
})
.catch((err)=>{
    alert(err);
});
});

function setLogo(code, element){
    for (let i = 0; i < logos.length; i++){
        if (logos[i].codes.includes(code)) {
            element.className = logos[i].logo;
            return;
        }
    }
}
