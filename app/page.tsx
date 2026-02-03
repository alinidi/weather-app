import { CurrentWeather } from '@/components/currentWeather/CurrentWeather';
import { SearchBar } from '@/components/searchBar/SearchBar';
import { WeatherMetrics } from '@/components/weatherMetrics/WeatherMetrics';

export default function Home() {
    const metrics = [
        {
            name: 'Feels Like',
            value: '18&#176;',
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
            </div>
        </div>
    );
}
