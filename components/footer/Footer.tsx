import Image from 'next/image';
import Link from 'next/link';
import gitHub from '../../assets/images/github.png';

export const Footer = () => {
    return (
        <footer className="bg-gray-800 bottom-0 flex items-center justify-around py-3 mt-4">
            <Link
                className="text-sm text-white"
                href={'https://github.com/alinidi'}
                target="_blank"
            >
                created by Alina Iulbaeva
            </Link>
            <Link href={'https://github.com/alinidi'} target="_blank">
                <Image src={gitHub} alt="github" width={20} />
            </Link>
        </footer>
    );
};
