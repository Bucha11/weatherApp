import { weatherAPI } from '../API/weatherAPI'

const SET_LOCATION_FORECAST = 'SET_LOCATION_FORECAST'
const SET_LOCATION = 'SET_LOCATION'
const SET_DATE_FORECAST = 'SET_DATE_FORECAST'
const ADD_CITY_TO_FAVOURITE = 'ADD_CITY_TO_FAVOURITE'
const initialState = {
  weather: {
    daily: {
      clouds: '',
      temperature: '',
      name: '',
      wind: '',
      date: '',
    },
    weekly: [],
  },
  favouriteCities: [],
  currentCity: '',
  location: {},
}

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION_FORECAST:
      let date = new Date(action.weather.dt * 1000)

      let formatDate =
        ('0' + date.getDate()).slice(-2) +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        date.getFullYear()
      return {
        ...state,
        weather: {
          ...state.weather,
          daily: {
            ...state.weather.daily,
            clouds: action.weather.clouds.all,
            temp: action.weather.main.temp,
            name: `${action.weather.name} ${action.weather.sys.country}`,
            wind: action.weather.wind.speed,
            date: formatDate,
          },
        },
      }

    case SET_LOCATION:
      return { ...state, location: action.payload }

    case SET_DATE_FORECAST:
      const data = action.payload.map((i) => {
        return {
          clouds: i.clouds,
          date: new Date(i.dt * 1000),
          temp: i.temp.day,
          wind: i.wind_speed,
        }
      })
      const formatData = data.map((i) => {
        return {
          ...i,
          date:
            ('0' + i.date.getDate()).slice(-2) +
            '-' +
            ('0' + (i.date.getMonth() + 1)).slice(-2) +
            '-' +
            i.date.getFullYear(),
          name: state.weather.daily.name,
        }
      })

      return { ...state, weather: { ...state.weather, weekly: formatData } }
    case ADD_CITY_TO_FAVOURITE:
      return {
        ...state,
        favouriteCities: state.favouriteCities.includes(action.payload)
          ? [...state.favouriteCities]
          : [...state.favouriteCities, action.payload],
      }
    default:
      return state
  }
}

const setLocationForecast = (payload) => {
  return { type: SET_LOCATION_FORECAST, weather: payload }
}

const setLocation = (payload) => {
  return { type: SET_LOCATION, payload }
}

const setDateForecast = (payload) => {
  return { type: SET_DATE_FORECAST, payload }
}

const addCityToFavourite = (payload) => {
  return { type: ADD_CITY_TO_FAVOURITE, payload }
}

export const setForecastThunk = (coord) => async (dispatch) => {
  const weather = await weatherAPI.getForecast(coord)
  dispatch(setLocationForecast(weather))
  dispatch(setLocation(coord))
}

export const setDateThunk = (data) => async (dispatch) => {
  const weather = await weatherAPI.getWeeklyForecast(data.coord)
  dispatch(setDateForecast(weather.daily))
}

export const setByNameThunk = (data) => async (dispatch) => {
  data = data.split(',')

  const weather = await weatherAPI.getForecastByName(data[0])
  let formatWeather = {
    ...weather,
    name: data[0],
    sys: { country: data[data.length - 1] },
  }
  dispatch(setLocationForecast(formatWeather))
  dispatch(setLocation(weather.coord))
}

export const addCityToFavouriteThunk = (data) => async (dispatch) => {
  dispatch(addCityToFavourite(data))
}
