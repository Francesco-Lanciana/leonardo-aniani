'use client';

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import { ChevronRightIcon } from '@chakra-ui/icons';

import AnimeTile from './_components/AnimeTile/AnimeTile';
import AnimeModal from './_components/AnimeModal/AnimeModal';
import Nav from './_components/Nav/Nav';

import { updateQueryParam } from '@/lib/url-helpers';
import { calcNumReview, formatDescription, getAverageScoreDisplayNumber } from '@/lib/anime-helpers';

import defaultProfilePic from '@/../public/default_profile.png';
import logo from '@/../public/logo.svg';

import styles from './information.module.scss';
import { Heading, List, ListItem } from '@chakra-ui/react';

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
            media(isAdult: false, type: ANIME) {
                id
                title {
                    romaji
                    english
                }
                description
                episodes
                averageScore
                stats {
                    scoreDistribution {
                        score
                        amount
                    }
                }
                startDate {
                    year
                }
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

interface PageInfo {
    total: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
    perPage: number;
}

interface AnimeInfo {
    id: number;
    title: {
        romaji: string;
        english: string;
    };
    description: string | null;
    episodes: number;
    averageScore: number;
    stats: {
        scoreDistribution: {
            score: number;
            amount: number;
        }[];
    };
    source: string;
    siteUrl: string;
    startDate: {
        year: number;
    };
    bannerImage: string;
    coverImage: {
        large: string;
        medium: string;
        color: string;
    };
}

interface AnimeData {
    Page: {
        pageInfo: PageInfo;
        media: AnimeInfo[];
    };
}

const NUM_TITLES_PER_PAGE = 20;

const pageParser = z.coerce.number().int().min(1);

function usePage(): {
    page: number;
    goToPage: (newPage: number) => void;
} {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageQueryParam = searchParams.get('page');
    const pageParseResult = pageParser.safeParse(pageQueryParam);
    const page = pageParseResult.success ? pageParseResult.data : 1;

    function goToPage(newPage: number) {
        const updatedUrl = updateQueryParam('page', newPage.toString());

        router.push(updatedUrl.toString());
    }

    return { page, goToPage };
}

export default function InformationPage() {
    const { page, goToPage } = usePage();
    const [animeModalId, setAnimeModalId] = useState<number>();

    const { loading, error, data } = useQuery<AnimeData>(GET_ANIME, {
        variables: { page, perPage: NUM_TITLES_PER_PAGE },
    });

    const selectedAnimeInfo: AnimeInfo | undefined = data?.Page?.media?.find(
        (anime: AnimeInfo) => anime.id === animeModalId
    );

    function handleCloseModal() {
        setAnimeModalId(undefined);
    }

    if (error) return <p>Error : {error.message}</p>;

    return (
        <main className={styles.page}>
            <div className={styles.headerBar}>
                <div className={styles.headerBarContent}>
                    <div className={styles.logoContainer}>
                        <Image src={logo} alt="Profile Picture" className={styles.logo} />
                        <span>AniAni</span>
                    </div>
                    <Link href="/profile" className={styles.profileButton}>
                        <div className={styles.profilePictureContainer}>
                            <Image src={defaultProfilePic} alt="Profile Picture" />
                        </div>
                        <ChevronRightIcon />
                    </Link>
                </div>
            </div>
            <div className={styles.pageContent}>
                <Heading fontSize="3xl" as="h1" marginBottom="2rem">
                    Anime
                </Heading>
                {loading && (
                    <div className={styles.animeListLoading}>
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className={styles.animeTileLoading}>
                                <div className={styles.imagePlaceholder}></div>
                                <div className={styles.titlePlaceholder}></div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && data && (
                    <>
                        <List className={styles.animeList}>
                            {data.Page.media.map((anime: AnimeInfo) => {
                                return (
                                    <ListItem key={anime.id}>
                                        <AnimeTile
                                            id={anime.id}
                                            image={anime.coverImage.large}
                                            averageScore={getAverageScoreDisplayNumber(anime.averageScore)}
                                            description={formatDescription(anime.description)}
                                            numEpisodes={anime.episodes}
                                            numReviews={calcNumReview(anime.stats.scoreDistribution)}
                                            title={anime.title.english ?? anime.title.romaji}
                                            onClick={setAnimeModalId}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                        <div className={styles.navContainer}>
                            <Nav
                                currentPage={page}
                                numPagesTotal={data.Page.pageInfo.lastPage}
                                numPagesToShow={4}
                                onSelectPage={goToPage}
                            />
                        </div>
                    </>
                )}

                {selectedAnimeInfo && (
                    <AnimeModal
                        show={true}
                        onClose={handleCloseModal}
                        englishTitle={selectedAnimeInfo.title.english}
                        romajiTitle={selectedAnimeInfo.title.romaji}
                        startYear={selectedAnimeInfo.startDate.year}
                        description={formatDescription(selectedAnimeInfo.description)}
                        numEpisodes={selectedAnimeInfo.episodes}
                        averageScore={getAverageScoreDisplayNumber(selectedAnimeInfo.averageScore)}
                        numReviews={calcNumReview(selectedAnimeInfo.stats.scoreDistribution)}
                        bannerImage={selectedAnimeInfo.bannerImage}
                    />
                )}
            </div>
        </main>
    );
}
