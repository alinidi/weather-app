import { CurrentWeather } from '@/components/currentWeather/CurrentWeather';
import { SearchBar } from '@/components/searchBar/SearchBar';

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-14">
            <h1 className="text-5xl text-white font-bold mt-5 mx-2 text-center">
                How's the sky looking today?
            </h1>
            <SearchBar />
            <CurrentWeather />
        </div>
    );
}
