/**
 * WIP: This is a work in progress. This test is not yet complete.
 *
 * If I were to complete this I would have added in the following:
 * 1. A test which uses msw to mock the graphQL endpoint and check that the page renders the correct data.
 * 2. A test which checks that the page renders the correct nav items based on the current page and max pages.
 * 3. A test which ensures you can view the modal by clicking one of the anime tiles.
 */

import { render, screen } from '@testing-library/react';
import InformationPage from '../app/information/page';

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null,
        };
    },
    useSearchParams() {
        return {
            get: () => null,
        };
    },
}));

// describe('Page', () => {
//     it('renders a heading', () => {
//         render(<InformationPage />);

//         const heading = screen.getByRole('heading', { level: 1 });

//         expect(heading).toBeInTheDocument();
//     });
// });
