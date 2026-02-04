'use client';

import search from '@/assets/images/icon-search.svg';
import { useWeather } from '@/context/WeatherContext';
import Image from 'next/image';
import { useState } from 'react';

export const SearchBar = () => {
    const { fetchWeatherByCity, isLoading } = useWeather();
    const [cityName, setCityName] = useState('');

    const handleSearch = () => {
        if (cityName.trim()) {
            fetchWeatherByCity(cityName);
            setCityName('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full mb-6 max-w-80 md:flex-row md:max-w-140">
            <div className="relative flex-1">
                <Image
                    src={search}
                    alt="search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                />
                <input
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="pl-12 pr-4 py-3 w-full bg-gray-600 rounded-md text-white focus:bg-gray-500 focus:outline-none focus:duration-75"
                    type="text"
                    placeholder="Search for a place..."
                />
            </div>
            <button
                onClick={handleSearch}
                disabled={isLoading}
                className="btn-primary px-5 py-3 cursor-pointer text-white bg-blue-900 rounded-md hover:bg-blue-800 hover:duration-300"
            >
                Search
            </button>
        </div>
    );
};
