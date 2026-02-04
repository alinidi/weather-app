import { StaticImageData } from 'next/image';

export type NominatimCity = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    boundingbox: [string, string, string, string];
};

export type NominatimResponse = NominatimCity[];

export type WeatherParams = {
    latitude: number;
    longitude: number;
    timezone?: string;
    forecast_days?: number;
};

export type WeatherResponse = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
        time: string;
        interval: string;
        temperature_2m: string;
        apparent_temperature: string;
        relative_humidity_2m: string;
        wind_speed_10m: string;
        precipitation: string;
        weather_code: string;
    };
    current: {
        time: string;
        interval: number;
        temperature_2m: number;
        apparent_temperature: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        precipitation: number;
        weather_code: number;
    };
    hourly_units: {
        time: string;
        temperature_2m: string;
        apparent_temperature: string;
        precipitation: string;
        weather_code: string;
        relative_humidity_2m: string;
        wind_speed_10m: string;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
        apparent_temperature: number[];
        precipitation: number[];
        weather_code: number[];
        relative_humidity_2m: number[];
        wind_speed_10m: number[];
    };
    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        apparent_temperature_max: string;
        apparent_temperature_min: string;
        precipitation_sum: string;
        wind_speed_10m_max: string;
        weather_code: string;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        apparent_temperature_max: number[];
        apparent_temperature_min: number[];
        precipitation_sum: number[];
        wind_speed_10m_max: number[];
        weather_code: number[];
    };
};

export type SimpleCity = {
    lat: string;
    lon: string;
    display_name: string;
    name: string;
};

export type HourlyForecastItem = {
    img: StaticImageData;
    hour: string;
    temp: string;
};

export type DailyForecastItem = {
    date: string;
    img: StaticImageData;
    day: string;
    night: string;
};

export type WeatherMetric = {
    name: string;
    value: string;
};
