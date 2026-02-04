'use client';

import { CurrentWeather } from './currentWeather/CurrentWeather';
import { DailyForecast } from './dailyForecast/DailyForecast';
import { HourlyForecast } from './hourlyForecast/HourlyForecast';
import { SearchBar } from './searchBar/SearchBar';
import { WeatherMetrics } from './weatherMetrics/WeatherMetrics';
import sunny from '../assets/images/icon-sunny.webp';
import rain from '../assets/images/icon-rain.webp';
import snow from '../assets/images/icon-snow.webp';
import fog from '../assets/images/icon-fog.webp';
import cloudy from '../assets/images/icon-partly-cloudy.webp';
import storm from '../assets/images/icon-storm.webp';
import drizzle from '../assets/images/icon-drizzle.webp';
import { useEffect } from 'react';
import { useWeather } from '@/context/WeatherContext';
import { getDailyForecastData } from '@/lib/utils/weatherUtils';
import { StaticImageData } from 'next/image';

type DailyForecastItem = {
    date: string;
    img: StaticImageData;
    day: string;
    night: string;
};

export const WeatherDashboard = () => {
    const { weather, city } = useWeather();

    useEffect(() => {
        console.log('Dashboard - City updated:', city);
        console.log('Dashboard - Weather updated:', weather?.current?.temperature_2m);
    }, [city, weather]);

    const metrics = weather
        ? [
              {
                  name: 'Feels Like',
                  value: `${Math.round(weather.current.apparent_temperature)}°`,
              },
              {
                  name: 'Humidity',
                  value: `${weather.current.relative_humidity_2m}%`,
              },
              {
                  name: 'Wind',
                  value: `${weather.current.wind_speed_10m} km/h`,
              },
              {
                  name: 'Precipitation',
                  value: `${weather.current.precipitation} mm`,
              },
          ]
        : [
              {
                  name: 'Feels Like',
                  value: '18°',
              },
              {
                  name: 'Humidity',
                  value: '46%',
              },
              {
                  name: 'Wind',
                  value: '14 km/h',
              },
              {
                  name: 'Precipitation',
                  value: '0 mm',
              },
          ];

    const dailyForecast = weather ? getDailyForecastData(weather) : [];

    const fallbackDailyForecast = [
        {
            date: 'Mon',
            img: sunny,
            day: '20°',
            night: '14°',
        },
        {
            date: 'Tue',
            img: cloudy,
            day: '21°',
            night: '15°',
        },
        {
            date: 'Wed',
            img: rain,
            day: '19°',
            night: '13°',
        },
        {
            date: 'Thu',
            img: drizzle,
            day: '18°',
            night: '12°',
        },
        {
            date: 'Fri',
            img: cloudy,
            day: '22°',
            night: '16°',
        },
        {
            date: 'Sat',
            img: sunny,
            day: '24°',
            night: '17°',
        },
        {
            date: 'Sun',
            img: storm,
            day: '21°',
            night: '14°',
        },
    ];

    const hourlyForecast = [
        {
            img: cloudy,
            hour: '3PM',
            temp: '20°',
        },
        {
            img: sunny,
            hour: '4PM',
            temp: '20°',
        },
        {
            img: drizzle,
            hour: '5PM',
            temp: '20°',
        },
        {
            img: storm,
            hour: '6PM',
            temp: '8°',
        },
        {
            img: snow,
            hour: '7PM',
            temp: '20°',
        },
        {
            img: cloudy,
            hour: '8PM',
            temp: '20°',
        },
        {
            img: cloudy,
            hour: '9PM',
            temp: '20°',
        },
        {
            img: cloudy,
            hour: '10PM',
            temp: '20°',
        },
    ];

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-5xl text-white font-bold mt-5 mb-5 mx-2 text-center">
                How's the sky looking today?
            </h1>
            <SearchBar />
            <div className="w-full px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                    <div className="flex flex-col gap-5">
                        <CurrentWeather city={city} weather={weather} />
                        <div className="mt-5">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-2">
                                {metrics.map((metric) => (
                                    <WeatherMetrics
                                        key={`${metric.name}-${metric.value}`}
                                        name={metric.name}
                                        value={metric.value}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-white text-xl mb-4">Daily forecast</p>
                            <div className="grid grid-cols-3 gap-4 lg:grid-cols-7">
                                {dailyForecast.length > 0
                                    ? dailyForecast.map((day: DailyForecastItem, index: number) => (
                                          <DailyForecast
                                              key={`${day.date}-${index}`}
                                              date={day.date}
                                              img={day.img}
                                              day={day.day}
                                              night={day.night}
                                          />
                                      ))
                                    : fallbackDailyForecast.map((day, index) => (
                                          <DailyForecast
                                              key={`fallback-${index}`}
                                              date={day.date}
                                              img={day.img}
                                              day={day.day}
                                              night={day.night}
                                          />
                                      ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0">
                        <div className="bg-gray-700 rounded-2xl p-4 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                                <p className="text-white text-xl">Hourly forecast</p>
                                <select
                                    name="Days"
                                    id="days"
                                    className="bg-gray-600 rounded-sm text-white p-2 text-sm"
                                >
                                    {weekDays.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {hourlyForecast.map((hour) => (
                                <HourlyForecast
                                    key={`${hour.hour}-${hour.temp}`}
                                    img={hour.img}
                                    hour={hour.hour}
                                    temp={hour.temp}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
