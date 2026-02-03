import { Footer } from '@/components/footer/Footer';
import '../app/globals.css';
import { Header } from '@/components/header/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className="bg-blue-950">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
