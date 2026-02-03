import Image from 'next/image';
import logo from '@/assets/images/logo.svg';

export const Header = () => {
    return (
        <header className="bg-blue-950 flex justify-between m-4 md:m-7">
            <Image src={logo} alt="logo" />
            <select
                defaultValue="EN"
                className="text-white text-md bg-gray-700 rounded-md p-2 hover:cursor-pointer"
            >
                <option value="English" disabled>
                    Languages
                </option>
                <option value="English">English</option>
                <option value="English">Russian</option>
            </select>
        </header>
    );
};
