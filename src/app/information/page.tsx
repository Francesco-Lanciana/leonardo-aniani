'use client';
import Image from 'next/image';
import styles from './information.module.scss';

import { useQuery, gql } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const GET_ANIME = gql`
    query GetAnime($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media {
                id
                title {
                    romaji
                }
                description
                source
                siteUrl
                bannerImage
                coverImage {
                    large
                    medium
                    color
                }
            }
        }
    }
`;

interface AnimeInfo {
    id: number;
    title: {
        romaji: string;
    };
    description: string;
    source: string;
    siteUrl: string;
    bannerImage: string;
    coverImage: {
        large: string;
        medium: string;
        color: string;
    };
}

const NUM_TITLES_PER_PAGE = 20;

const pageParser = z.coerce.number().int().min(1);

function updateQueryParam(param: string, newValue: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(param, newValue);

    return url;
}

function usePage(): { page: number; goToNextPage: () => void; goToPreviousPage: () => void } {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageQueryParam = searchParams.get('page');
    const pageParseResult = pageParser.safeParse(pageQueryParam);
    const page = pageParseResult.success ? pageParseResult.data : 1;

    function goToNextPage() {
        const updatedUrl = updateQueryParam('page', (page + 1).toString());

        router.push(updatedUrl.toString());
    }

    function goToPreviousPage() {
        const newPage = Math.max(1, page - 1);
        const updatedUrl = updateQueryParam('page', newPage.toString());

        router.push(updatedUrl.toString());
    }

    return { page, goToNextPage, goToPreviousPage };
}

export default function Home() {
    const { page, goToNextPage, goToPreviousPage } = usePage();

    const { loading, error, data } = useQuery(GET_ANIME, {
        variables: { page, perPage: NUM_TITLES_PER_PAGE },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                {data.Page.media.map((anime: AnimeInfo) => (
                    <div key={anime.id}>{anime.title.romaji}</div>
                ))}

                <button onClick={goToPreviousPage}>Previous</button>
                <button onClick={goToNextPage}>Next</button>
                {/* {data.Page.media.map((anime) => (
                <div key={anime.id} className={styles.card}>{anime.</div>
              )} */}
            </div>
        </main>
    );
}
