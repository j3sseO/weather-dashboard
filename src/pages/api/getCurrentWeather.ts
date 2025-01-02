/// <reference types="astro/client" />
import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const OPEN_WEATHER_API_KEY = import.meta.env.OPEN_WEATHER_API_KEY

  try {
    const data = await request.json()
    const { lat, lon } = data

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    const response = await fetch(weatherUrl)
    const weatherData = await response.json()

    return new Response(JSON.stringify(weatherData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch weather data' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
