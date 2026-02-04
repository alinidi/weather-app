'use client';

import Image from 'next/image';
import bgSmall from '../../assets/images/bg-today-small.svg';
import bgLarge from '../../assets/images/bg-today-large.svg';
import { useEffect, useState } from 'react';
import { SimpleCity, WeatherResponse } from '@/lib/api/types';
import { formatDate, getTemperature, getCityName, getWeatherIcon } from '@/lib/utils/weatherUtils';

export type CurrentWeatherProps = {
    city: SimpleCity | null;
    weather: WeatherResponse | null;
};

export const CurrentWeather = ({ city, weather }: CurrentWeatherProps) => {
    const [width, setWidth] = useState(0);

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
            <Image
                src={width > 640 ? bgLarge : bgSmall}
                alt="current weather"
                className="w-full h-auto"
            />
            <div className="absolute inset-0 p-4 sm:p-8 flex flex-col sm:flex-row justify-evenly">
                <div className="text-center sm:text-left w-full sm:w-auto sm:max-w-[45%] md:max-w-[50%] sm:self-center">
                    <p className="text-white font-bold text-2xl sm:text-3xl md:text-base lg:text-xl lg:mb-2">
                        {getCityName(city)}
                    </p>
                    <p className="text-gray-300 text-lg sm:text-xl mt-1 md:text-sm lg:text-xl">
                        {formatDate(weather?.current?.time)}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between mt-6 sm:mt-0 sm:self-center">
                    <Image
                        width={150}
                        className="sm:w-40 md:w-22 lg:w-25 lg:mr-5"
                        src={getWeatherIcon(weather)}
                        alt="weather icon"
                    />
                    <span className="text-6xl mb-3 text-white font-bold md:text-3xl sm:text-5xl lg:text-6xl">
                        {getTemperature(weather)}
                    </span>
                </div>
            </div>
        </div>
    );
};
