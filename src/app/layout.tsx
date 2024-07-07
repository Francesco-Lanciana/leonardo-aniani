import type { Metadata } from 'next';
import '@/styles/globals.scss';

import Providers from './providers';

export const metadata: Metadata = {
    title: 'AniAni - Your favorite anime list',
    description: 'A list of all your favorite anime',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
