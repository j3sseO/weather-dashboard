// Constants
const WEATHER_DATA_KEY = 'weatherData'
const LOCATION_DATA_KEY = 'locationData'
const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

// Weather data types based on the example data structure
type WeatherValues = {
  cloudBase: number | null
  cloudCeiling: number | null
  cloudCover: number
  dewPoint: number
  freezingRainIntensity: number
  hailProbability: number
  hailSize: number
  humidityAvg: number
  precipitationProbability: number
  pressureSurfaceLevel: number
  rainIntensity: number
  sleetIntensity: number
  snowIntensity: number
  temperature: number
  temperatureAvg: number
  temperatureApparent: number
  temperatureMin: number
  temperatureMax: number
  uvHealthConcern: number
  uvIndex: number
  humidity: number
  uvIndexAvg: number
  visibility: number
  weatherCode: number
  windDirectionAvg: number
  windGust: number
  windSpeedAvg: number
}

type TimelineForecast = {
  time: string
  values: WeatherValues
}

type WeatherData = {
  locationData: {
    display_name: string
  }

  currentData: {
    data: {
      time: string

      values: WeatherValues
    }
    location: {
      lat: number
      lon: number
    }
  }
  weatherData: {
    weatherData: {
      timelines: {
        hourly: TimelineForecast[]
        daily: TimelineForecast[]
      }
    }
    currentData: {
      data: {
        time: string
        values: WeatherValues
      }
    }
  }
}

type StoredData = {
  data: WeatherData
  timestamp: number
}
export const storage = {
  setWeatherData: (data: WeatherData) => {
    const storedData: StoredData = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(WEATHER_DATA_KEY, JSON.stringify(storedData))
  },

  getWeatherData: (): WeatherData | null => {
    const storedData = localStorage.getItem(WEATHER_DATA_KEY)
    if (!storedData) return null

    const { data, timestamp }: StoredData = JSON.parse(storedData)
    const isExpired = Date.now() - timestamp > CACHE_DURATION

    if (isExpired) {
      localStorage.removeItem(WEATHER_DATA_KEY)
      return null
    }

    return data
  },

  clearWeatherData: () => {
    localStorage.removeItem(WEATHER_DATA_KEY)
  },

  temperatureUnit: {
    get: () => localStorage.getItem('temperatureUnit') || 'celsius',
    set: (unit: 'celsius' | 'fahrenheit') =>
      localStorage.setItem('temperatureUnit', unit),
  },
}
