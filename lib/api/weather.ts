import { fetchApi } from './client';
import { NominatimCity, SimpleCity, WeatherParams, WeatherResponse } from './types';

export const getWeather = (params: WeatherParams): Promise<WeatherResponse> => {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast';

    const queryParams = new URLSearchParams({
        latitude: params.latitude.toString(),
        longitude: params.longitude.toString(),
        timezone: params.timezone || 'auto',
        forecast_days: params.forecast_days?.toString() || '7',
        current:
            'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code',
        hourly: 'temperature_2m,apparent_temperature,precipitation,weather_code,relative_humidity_2m,wind_speed_10m',
        daily: 'temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max,weather_code',
        windspeed_unit: 'kmh',
        precipitation_unit: 'mm',
        timeformat: 'iso8601',
    });

    const url = `${baseUrl}?${queryParams.toString()}`;
    console.log('API URL:', url);

    return fetchApi<WeatherResponse>(url);
};

export const searchCity = async (cityName: string): Promise<SimpleCity[]> => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json`;

    const data: NominatimCity[] = await fetchApi(url);

    return data.map((item: NominatimCity) => ({
        lat: item.lat,
        lon: item.lon,
        display_name: item.display_name,
        name: item.name,
    }));
};
