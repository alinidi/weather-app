import { WeatherDashboard } from '@/components/WeatherDashboard';
import { WeatherProvider } from '@/context/WeatherContext';

export default function Home() {
    return (
        <WeatherProvider>
            <WeatherDashboard />
        </WeatherProvider>
    );
}
