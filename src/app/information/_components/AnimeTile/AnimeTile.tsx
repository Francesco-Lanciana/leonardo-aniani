import Image from 'next/image';

import styles from './AnimeTile.module.scss';
import { getNumReviewsText } from '@/lib/anime-helpers';
import { Heading, Text } from '@chakra-ui/react';

interface AnimeTileProps {
    id: number;
    image: string;
    title: string;
    description: string;
    numEpisodes: number;
    averageScore: number;
    numReviews: number;
    onClick: (id: number) => void;
}

const AnimeTile: React.FC<AnimeTileProps> = ({
    id,
    image,
    title,
    description,
    numEpisodes,
    averageScore,
    numReviews,
    onClick,
}) => {
    const numReviewsText = getNumReviewsText(numReviews);

    return (
        <button className={styles.animeTile} onClick={() => onClick(id)}>
            <div className={styles.defaultTile}>
                <div className={styles.imageContainer}>
                    <Image
                        src={image}
                        alt={`Cover image for ${title}`}
                        fill={true}
                        className={styles.image}
                        sizes="(max-width: 400px) 100vw, (max-width: 800px) 50vw"
                    />
                </div>
                <Heading as="h4" size="xs" noOfLines={3}>
                    {title}
                </Heading>
            </div>

            <div className={styles.hoverTile}>
                <Heading as="h4" size="xs" className={styles.hoverTitle} noOfLines={3} marginBottom="0.75rem">
                    {title}
                </Heading>
                <div className={styles.reviews}>
                    <span className={styles.score}>{averageScore}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-labelledby={`${id}-tile-star`}
                        role="img"
                        className={styles.starIcon}
                    >
                        <title id={`${id}-tile-star`}>Star Review</title>
                        <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z"></path>
                    </svg>
                    <span className={styles.numReviews}>{numReviewsText}</span>
                </div>
                <Text fontSize="sm" className={styles.numEpisodes}>
                    {numEpisodes > 1 ? `${numEpisodes} Episodes` : `${numEpisodes} Episode`}{' '}
                </Text>
                <Text fontSize="sm" noOfLines={6} className={styles.description}>
                    {description}
                </Text>
            </div>
        </button>
    );
};

export default AnimeTile;
