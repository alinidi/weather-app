import { CurrentWeather } from '@/components/currentWeather/CurrentWeather';
import { DailyForecast } from '@/components/dailyForecast/DailyForecast';
import { SearchBar } from '@/components/searchBar/SearchBar';
import { WeatherMetrics } from '@/components/weatherMetrics/WeatherMetrics';
import sunny from '../assets/images/icon-sunny.webp';
import rain from '../assets/images/icon-rain.webp';
import snow from '../assets/images/icon-snow.webp';
import fog from '../assets/images/icon-fog.webp';
import cloudy from '../assets/images/icon-partly-cloudy.webp';
import storm from '../assets/images/icon-storm.webp';
import drizzle from '../assets/images/icon-drizzle.webp';

export default function Home() {
    const metrics = [
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

    const dailyForecast = [
        {
            date: 'Tue',
            img: sunny,
            day: '20°',
            night: '14°',
        },
        {
            date: 'Wed',
            img: storm,
            day: '20°',
            night: '14°',
        },
        {
            date: 'Thu',
            img: drizzle,
            day: '20°',
            night: '14°',
        },
        {
            date: 'Fri',
            img: rain,
            day: '21°',
            night: '15°',
        },
        {
            date: 'Sat',
            img: cloudy,
            day: '21°',
            night: '15°',
        },
        {
            date: 'Sun',
            img: snow,
            day: '25°',
            night: '16°',
        },
        {
            date: 'Mon',
            img: fog,
            day: '24°',
            night: '15°',
        },
    ];

    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-5xl text-white font-bold mt-5 mb-5 mx-2 text-center">
                How's the sky looking today?
            </h1>
            <SearchBar />
            <div className="w-full px-5">
                <CurrentWeather />
                <div className="mt-5">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 ">
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
                    <p className="text-white text-xl mb-2">Daily forecast</p>
                    <div className="grid grid-cols-3 gap-4 md:grid-cols-7">
                        {dailyForecast.map((day) => (
                            <DailyForecast
                                key={`${day} + ${day.date}`}
                                date={day.date}
                                img={day.img}
                                day={day.day}
                                night={day.night}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
