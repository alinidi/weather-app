'use client';

import Image from 'next/image';
import bgSmall from '../../assets/images/bg-today-small.svg';
import bgLarge from '../../assets/images/bg-today-large.svg';
import sunny from '../../assets/images/icon-sunny.webp';
import { useEffect, useState } from 'react';
import { SimpleCity, WeatherResponse } from '@/lib/api/types';
import { getDetailedWeatherIcon } from '@/lib/utils/weatherIcons';

type CurrentWeatherProps = {
    city: SimpleCity | null;
    weather: WeatherResponse | null;
};

export const CurrentWeather = ({ city, weather }: CurrentWeatherProps) => {
    const [width, setWidth] = useState(0);

    const formatDate = () => {
        if (!weather?.current?.time) return 'Tuesday, Aug 5, 2026';

        const date = new Date(weather.current.time);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getTemperature = () => {
        if (!weather?.current?.temperature_2m) {
            console.log('No temperature data, weather:', weather);
            return '25°';
        }

        const temp = weather.current.temperature_2m;
        console.log('Raw temperature from API:', temp);
        console.log('Rounded temperature:', Math.round(temp));

        return `${Math.round(temp)}°`;
    };

    const getCityName = () => {
        if (city?.name) {
            return `${city.name}, ${city.display_name.split(',').at(-1)}`;
        }
        return 'Berlin, Germany';
    };

    const getWeatherIcon = () => {
        if (weather?.current.weather_code !== undefined) {
            return getDetailedWeatherIcon(weather.current.weather_code);
        }
        return sunny;
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWidth(width);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative">
            <Image src={width > 640 ? bgLarge : bgSmall} alt="current weather" className="w-full" />
            <div className="absolute inset-0 p-4 sm:p-8 flex flex-col sm:flex-row justify-evenly">
                <div className="text-center sm:text-left sm:self-center">
                    <p className="text-white font-bold text-2xl sm:text-4xl md:text-base lg:text-2xl">
                        {getCityName()}
                    </p>
                    <p className="text-gray-300 text-lg sm:text-2xl mt-1 md:text-sm  lg:text-lg">
                        {formatDate()}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between mt-6 sm:mt-0 sm:self-center">
                    <Image
                        width={150}
                        className="sm:w-50 md:w-22 lg:w-18"
                        src={getWeatherIcon()}
                        alt="weather icon"
                    />
                    <span className="text-6xl mb-3 text-white font-bold md:text-3xl">
                        {getTemperature()}
                    </span>
                </div>
            </div>
        </div>
    );
};
