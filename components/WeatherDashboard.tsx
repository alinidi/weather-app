'use client';

import { CurrentWeather } from './currentWeather/CurrentWeather';
import { DailyForecast } from './dailyForecast/DailyForecast';
import { HourlyForecast } from './hourlyForecast/HourlyForecast';
import { SearchBar } from './searchBar/SearchBar';
import { WeatherMetrics } from './weatherMetrics/WeatherMetrics';
import { useEffect, useState } from 'react';
import { useWeather } from '@/context/WeatherContext';
import { getDailyForecastData, getHourlyForecastData } from '@/lib/utils/weatherUtils';
import { DailyForecastItem, HourlyForecastItem } from '@/lib/api/types';

export const WeatherDashboard = () => {
    const { weather, city, isLoading } = useWeather();
    const [dailyForecast, setDailyForecast] = useState<DailyForecastItem[]>([]);
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>([]);

    useEffect(() => {
        if (weather) {
            const dailyData = getDailyForecastData(weather);
            const hourlyData = getHourlyForecastData(weather, 8);

            setDailyForecast(dailyData);
            setHourlyForecast(hourlyData);
        } else {
            setDailyForecast([]);
            setHourlyForecast([]);
        }
    }, [weather]);

    const metrics = weather
        ? [
              {
                  name: 'Feels Like',
                  value: `${Math.round(weather.current?.apparent_temperature || 0)}°`,
              },
              {
                  name: 'Humidity',
                  value: `${weather.current?.relative_humidity_2m || 0}%`,
              },
              {
                  name: 'Wind',
                  value: `${weather.current?.wind_speed_10m || 0} km/h`,
              },
              {
                  name: 'Precipitation',
                  value: `${weather.current?.precipitation || 0} mm`,
              },
          ]
        : [
              {
                  name: 'Feels Like',
                  value: '-',
              },
              {
                  name: 'Humidity',
                  value: '-',
              },
              {
                  name: 'Wind',
                  value: '-',
              },
              {
                  name: 'Precipitation',
                  value: '-',
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
                            {isLoading ? (
                                <div className="grid grid-cols-3 gap-4 lg:grid-cols-7">
                                    {Array.from({ length: 7 }).map((_, index) => (
                                        <div
                                            key={`skeleton-daily-${index}`}
                                            className="bg-gray-700 rounded-xl p-3 w-auto h-24 animate-pulse"
                                        />
                                    ))}
                                </div>
                            ) : dailyForecast.length > 0 ? (
                                <div className="grid grid-cols-3 gap-4 lg:grid-cols-7">
                                    {dailyForecast.map((day: DailyForecastItem, index: number) => (
                                        <DailyForecast
                                            key={`${day.date}-${index}`}
                                            date={day.date}
                                            img={day.img}
                                            day={day.day}
                                            night={day.night}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-400 text-center py-8">
                                    No daily forecast data available
                                </div>
                            )}
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

                            {isLoading ? (
                                <div className="space-y-2">
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <div
                                            key={`skeleton-hourly-${index}`}
                                            className="bg-gray-600 rounded-sm p-2 w-full h-12 animate-pulse"
                                        />
                                    ))}
                                </div>
                            ) : hourlyForecast.length > 0 ? (
                                hourlyForecast.map((hour: HourlyForecastItem, index: number) => (
                                    <HourlyForecast
                                        key={`${hour.hour}-${index}`}
                                        img={hour.img}
                                        hour={hour.hour}
                                        temp={hour.temp}
                                    />
                                ))
                            ) : (
                                <div className="text-gray-400 text-center py-8">
                                    No hourly forecast data available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
