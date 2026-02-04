import { HourlyForecastItem, SimpleCity, WeatherResponse } from '../api/types';
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

export const getHourlyForecastForDay = (
    weather: WeatherResponse | null,
    dayOffset: number = 0,
    hoursCount: number = 8
): HourlyForecastItem[] => {
    if (!weather?.hourly) return [];

    const { time, temperature_2m, weather_code } = weather.hourly;

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + dayOffset);
    const targetDateString = targetDate.toISOString().slice(0, 10);

    const hourlyForDay = time
        .map((timestamp: string, index: number) => ({
            timestamp,
            temp: temperature_2m[index],
            code: weather_code[index],
        }))
        .filter((item) => item.timestamp.startsWith(targetDateString))
        .slice(0, hoursCount);

    return hourlyForDay.map((item) => {
        const date = new Date(item.timestamp);
        const hour = date.getHours();
        const hour12 = hour % 12 || 12;
        const ampm = hour >= 12 ? 'PM' : 'AM';

        return {
            hour: `${hour12}${ampm}`,
            temp: `${Math.round(item.temp)}°`,
            img: getDetailedWeatherIcon(item.code),
        };
    });
};
