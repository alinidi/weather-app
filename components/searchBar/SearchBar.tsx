import search from '@/assets/images/icon-search.svg';
import Image from 'next/image';

export const SearchBar = () => {
    return (
        <div className="flex flex-col gap-3 w-full max-w-80 md:flex-row md:max-w-140">
            <div className="relative flex-1">
                <Image
                    src={search}
                    alt="search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                />
                <input
                    className="pl-12 pr-4 py-3 w-full bg-gray-600 rounded-md text-white focus:bg-gray-500 focus:outline-none focus:duration-75"
                    type="text"
                    placeholder="Search for a place..."
                />
            </div>
            <button className="btn-primary px-5 py-3 cursor-pointer text-white bg-blue-900 rounded-md hover:bg-blue-800 hover:duration-300">
                Search
            </button>
        </div>
    );
};
