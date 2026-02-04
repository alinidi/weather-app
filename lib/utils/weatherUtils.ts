import { SimpleCity, WeatherResponse } from '../api/types';
import { getDetailedWeatherIcon } from './weatherIcons';
import sunny from '../../assets/images/icon-sunny.webp';

export const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const getDailyForecastData = (weather: any) => {
    if (!weather?.daily) return [];

    const { time, temperature_2m_max, temperature_2m_min, weather_code } = weather.daily;

    return time.map((date: string, index: number) => ({
        date: getDayOfWeek(date),
        img: getDetailedWeatherIcon(weather_code[index]),
        day: `${Math.round(temperature_2m_max[index])}°`,
        night: `${Math.round(temperature_2m_min[index])}°`,
    }));
};

export const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Tuesday, Aug 5, 2026';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const getTemperature = (weather: WeatherResponse | null): string => {
    if (!weather?.current?.temperature_2m) {
        return '25°';
    }

    const temp = weather.current.temperature_2m;
    return `${Math.round(temp)}°`;
};

export const getCityName = (city: SimpleCity | null): string => {
    if (city?.name && city?.display_name) {
        const parts = city.display_name.split(',');
        const country = parts[parts.length - 1]?.trim();
        return `${city.name}, ${country}`;
    }
    return 'Berlin, Germany';
};

export const getWeatherIcon = (weather: WeatherResponse | null) => {
    if (weather?.current?.weather_code !== undefined) {
        return getDetailedWeatherIcon(weather.current.weather_code);
    }
    return sunny;
};
