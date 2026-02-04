import sunny from '@/assets/images/icon-sunny.webp';
import cloudy from '@/assets/images/icon-partly-cloudy.webp';
import rain from '@/assets/images/icon-rain.webp';
import snow from '@/assets/images/icon-snow.webp';
import fog from '@/assets/images/icon-fog.webp';
import storm from '@/assets/images/icon-storm.webp';
import drizzle from '@/assets/images/icon-drizzle.webp';
import { StaticImageData } from 'next/image';

export const getDetailedWeatherIcon = (code: number): StaticImageData => {
    switch (code) {
        case 0:
            return sunny;
        case 1:
            return cloudy;
        case 2:
            return cloudy;
        case 3:
            return cloudy;
        case 45:
            return fog;
        case 48:
            return fog;
        case 51:
            return drizzle;
        case 53:
            return drizzle;
        case 55:
            return drizzle;
        case 56:
            return drizzle;
        case 57:
            return drizzle;
        case 61:
            return rain;
        case 63:
            return rain;
        case 65:
            return rain;
        case 66:
            return rain;
        case 67:
            return rain;
        case 71:
            return snow;
        case 73:
            return snow;
        case 75:
            return snow;
        case 77:
            return snow;
        case 80:
            return storm;
        case 81:
            return storm;
        case 82:
            return storm;
        case 85:
            return storm;
        case 86:
            return storm;
        case 95:
            return storm;
        case 96:
            return storm;
        case 99:
            return storm;
        default:
            return sunny;
    }
};
