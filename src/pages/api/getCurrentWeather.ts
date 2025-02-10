/// <reference types="astro/client" />
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()
    const { lat, lon } = data

    const [weatherData, locationData] = await Promise.all([
      getWeatherData(lat, lon),
      getLocationDetails(lat, lon),
    ])

    return new Response(JSON.stringify({ weatherData, locationData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching weather/location data:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch weather/location data' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}

export const getWeatherData = async (lat: number, lon: number) => {
  const TOMORROW_API_KEY = import.meta.env.TOMORROW_API_KEY

  // Get current weather data
  const currentResponse = await fetch(
    `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&units=metric&apikey=${TOMORROW_API_KEY}`,
  )
  const currentData = await currentResponse.json()

  // Get forecasted weather data
  const weatherResponse = await fetch(
    `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1h,1d&apikey=${TOMORROW_API_KEY}`,
  )
  const weatherData = await weatherResponse.json()

  return { currentData, weatherData }
}

export const getLocationDetails = async (lat: number, lon: number) => {
  // Get location details from OpenStreetMap
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=12`,
  )

  if (!response.ok)
    throw new Error(`Geocoding API Error: ${response.statusText}`)

  const locationData = await response.json()
  return locationData
}
