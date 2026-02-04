'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getWeather, searchCity } from '@/lib/api/weather';

type WeatherContextType = {
    weather: any;
    isLoading: boolean;
    error: string | null;
    city: any;
    fetchWeatherByCity: (cityName: string) => Promise<void>;
};

const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherProvider({ children }: { children: ReactNode }) {
    const [weather, setWeather] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [city, setCity] = useState<any>(null);

    const fetchWeather = async (lat: number, lon: number) => {
        setIsLoading(true);
        try {
            const data = await getWeather({ latitude: lat, longitude: lon, forecast_days: 7 });
            setWeather(data);
        } catch (err) {
            setError('Failed to load weather');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchWeatherByCity = async (cityName: string) => {
        if (!cityName.trim()) return;

        setIsLoading(true);
        try {
            const cities = await searchCity(cityName);
            if (cities.length > 0) {
                const foundCity = cities[0];
                setCity(foundCity);
                await fetchWeather(parseFloat(foundCity.lat), parseFloat(foundCity.lon));
            }
        } catch (err) {
            setError('City not found');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const defaultCity = {
            lat: '52.52',
            lon: '13.41',
            display_name: 'Berlin, Germany',
            name: 'Berlin',
        };
        setCity(defaultCity);
        fetchWeather(52.52, 13.41);
    }, []);

    const value: WeatherContextType = {
        weather,
        isLoading,
        error,
        city,
        fetchWeatherByCity,
    };

    return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export function useWeather() {
    const context = useContext(WeatherContext);

    if (!context) {
        throw new Error('useWeather must be used inside WeatherProvider');
    }

    return context;
}
