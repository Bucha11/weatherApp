import * as axios from 'axios'

export const weatherAPI = {
  APIkey: 'fe57b721fd47b8600afac45a7829c1ea',
  getWeeklyForecast(coord) {
    let { lat, lon } = coord

    return axios
      .get(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=metric&APPID=${this.APIkey}`
      )
      .then((res) => res.data)
  },
  getForecast(coord) {
    let { lat, lon } = coord

    return axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${this.APIkey}`
      )
      .then((res) => res.data)
  },

  getForecastByName(data) {
    return axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&APPID=${this.APIkey}`
      )
      .then((res) => res.data)
  },
}
