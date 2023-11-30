import '../css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns'


const search = document.getElementById('searchCity')

function setWeather(weather) {
    console.log(weather)
    const date = document.getElementById('date')
    const time = document.getElementById('time')
    const location = document.getElementById('location')
    const currentWeather = document.getElementById('current-weather')
    const logo = document.getElementById("logo")
    const logoDescription = document.getElementById("logo-description")
    const feelsLike = document.getElementById('feel')
    const precipitation = document.getElementById('precipitation')
    const humidity = document.getElementById('humidity')
    const wind = document.getElementById('wind')
    const maxTemp = document.getElementById('high')
    const minTemp = document.getElementById('low')
    // let sunrise = document.getElementById('high')
    // let sunset = document.getElementById('high')

    let dateTime = weather.location.localtime.split(' ')
    dateTime = new Date(dateTime)
    const currentDate = format(dateTime, 'MMMM dd yyyy')
    const currentTime = format(dateTime, 'h:mm b')

    console.log(currentDate)
    date.innerHTML = currentDate
    time.innerHTML = currentTime // shows the last updated time in fetched from api
    location.innerHTML = `${weather.location.name  }, ${  weather.location.country}`
    currentWeather.innerHTML = weather.current.temp_c
    logo.src = weather.current.condition.icon
    logoDescription.innerHTML = weather.current.condition.text
    feelsLike.innerHTML = weather.current.feelslike_c
    precipitation.innerHTML = weather.current.precip_mm
    humidity.innerHTML = weather.current.humidity
    wind.innerHTML = weather.current.wind_kph
    maxTemp.innerHTML = weather.forecast.forecastday[0].day.maxtemp_c
    minTemp.innerHTML = weather.forecast.forecastday[0].day.mintemp_c
}

async function getWeather(city) {
    const errMsg = document.getElementById('error')
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=fbb48125bdb54677aad191158232611&q=${city}`, {mode:'cors'})
        if (response.ok) {
            const weather = await response.json()
            setWeather(weather)
        } else {
            const weatherError = await response.json()
            throw new Error(weatherError.error.message)
        }
    } catch (error) {
        errMsg.innerHTML = error.message
    }
}


search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        const city = search.value
        const errMsg = document.getElementById('error')
        if (city === '') {
            errMsg.innerHTML = 'City name cannot be blank'
            return
        }
        const form = document.getElementById('form')
        form.reset()
        getWeather(city)
    }
})

getWeather('Toronto')