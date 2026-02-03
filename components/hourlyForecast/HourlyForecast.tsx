import Image, { StaticImageData } from 'next/image';

type HourlyType = {
    img: StaticImageData;
    hour: string;
    temp: string;
};

export const HourlyForecast = ({ img, hour, temp }: HourlyType) => {
    return (
        <div className="bg-gray-600 rounded-sm text-white p-2 w-full flex items-center justify-between mb-2 my-1">
            <div className="flex items-center gap-5">
                <Image src={img} alt="weather" width={40} />
                <span>{hour}</span>
            </div>
            <span>{temp}</span>
        </div>
    );
};
