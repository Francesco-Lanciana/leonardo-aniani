import type { Metadata } from 'next';
import '@/styles/globals.scss';

// Without these lines, the icons won't render correctly in server components (the styles are missing)
// import { config } from '@fortawesome/fontawesome-svg-core';
// import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
// config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import Providers from './providers';

export const metadata: Metadata = {
    title: 'AnimeList',
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
