'use client';

import Image from 'next/image';
import bgSmall from '../../assets/images/bg-today-small.svg';
import bgLarge from '../../assets/images/bg-today-large.svg';
import sunny from '../../assets/images/icon-sunny.webp';
import { useEffect, useState } from 'react';

export const CurrentWeather = () => {
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
            <Image src={width > 640 ? bgLarge : bgSmall} alt="current weather" className="w-full" />
            <div className="absolute inset-0 p-4 sm:p-8 flex flex-col sm:flex-row justify-between">
                <div className="text-center sm:text-left sm:self-center">
                    <p className="text-white font-bold text-3xl sm:text-4xl md:text-xl">
                        Berlin, Germany
                    </p>
                    <p className="text-gray-300 text-lg sm:text-2xl mt-1 md:text-sm">
                        Tuesday, Aug 5, 2026
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between mt-6 sm:mt-0 sm:self-center">
                    <Image width={200} className="sm:w-50 md:w-25" src={sunny} alt="weather icon" />
                    <span className="text-7xl mb-3 text-white font-bold md:text-5xl">25&#176;</span>
                </div>
            </div>
        </div>
    );
};
