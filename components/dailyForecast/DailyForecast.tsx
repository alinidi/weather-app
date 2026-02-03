import Image, { StaticImageData } from 'next/image';

type ForecastType = {
    date: string;
    img: StaticImageData;
    day: string;
    night: string;
};

export const DailyForecast = ({ date, img, day, night }: ForecastType) => {
    return (
        <div className="bg-gray-700 rounded-xl p-3 w-auto flex flex-col gap-2 items-center">
            <p className="text-white">{date}</p>
            <Image src={img} alt="weather" width={40} height={40} />
            <div className="flex justify-center w-full text-xl px-2 gap-4">
                <p className="text-white">{day}</p>
                <p className="text-gray-300">{night}</p>
            </div>
        </div>
    );
};
