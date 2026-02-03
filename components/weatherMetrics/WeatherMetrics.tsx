type MetricsType = {
    name: string;
    value: string;
};

export const WeatherMetrics = ({ name, value }: MetricsType) => {
    return (
        <div className="bg-gray-700 rounded-xl p-3 w-auto flex flex-col gap-2">
            <p className="text-gray-300">{name}</p>
            <p className="text-white text-xl">{value}</p>
        </div>
    );
};
