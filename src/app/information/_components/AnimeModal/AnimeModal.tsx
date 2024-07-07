import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    Heading,
} from '@chakra-ui/react';

import styles from './AnimeModal.module.scss';
import { useId } from 'react';
import { getNumReviewsText } from '@/lib/anime-helpers';
import Image from 'next/image';

interface AnimeModalProps {
    show: boolean;
    bannerImage: string;
    englishTitle: string;
    romajiTitle: string;
    description: string;
    startYear: number;
    numEpisodes: number;
    averageScore: number;
    numReviews: number;
    onClose: () => void;
}

const AnimeModal: React.FC<AnimeModalProps> = ({
    show,
    bannerImage,
    englishTitle,
    romajiTitle,
    description,
    startYear,
    numEpisodes,
    averageScore,
    numReviews,
    onClose,
}) => {
    const { isOpen } = useDisclosure({ isOpen: show, onClose });
    const id = useId();

    const numReviewsText = getNumReviewsText(numReviews);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent width="90vw">
                <ModalCloseButton className={styles.closeButton} background="rgb(0 0 0 / 67%);" zIndex={80} />
                <ModalBody padding="0 0 2rem 0">
                    <ModalHeader padding={!!bannerImage ? '0' : '3rem 0 0;'} marginBottom="1rem">
                        {!!bannerImage && (
                            <div className={styles.bannerImageContainer}>
                                <Image
                                    src={bannerImage}
                                    alt={`Banner image for ${englishTitle}`}
                                    width={800}
                                    height={170}
                                    className={styles.bannerImage}
                                />
                            </div>
                        )}
                        <div className={styles.titleInfo}>
                            {!!englishTitle && (
                                <>
                                    <Heading as="h4" size="lg">
                                        {englishTitle}
                                    </Heading>
                                    <Text fontSize="xl" as="i" fontWeight="500" marginTop="0.25rem">
                                        {romajiTitle}
                                    </Text>
                                </>
                            )}
                            {!englishTitle && (
                                <Heading as="h4" size="lg">
                                    {romajiTitle}
                                </Heading>
                            )}
                        </div>
                    </ModalHeader>

                    <div className={styles.animeInfo}>
                        <div className={styles.airingInfo}>
                            {startYear && <div className={styles.airingInfoItem}>{startYear}</div>}
                            {!!numEpisodes && (
                                <div className={styles.airingInfoItem}>
                                    <Text fontSize="md">
                                        {numEpisodes > 1
                                            ? `${numEpisodes} Episodes`
                                            : `${numEpisodes} Episode`}
                                    </Text>
                                </div>
                            )}
                            <div className={styles.airingInfoItem}>
                                {!!averageScore && (
                                    <>
                                        <span className={styles.score}>{averageScore}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            aria-labelledby={`${id}-modal-star`}
                                            role="img"
                                            className={styles.starIcon}
                                        >
                                            <title id={`${id}-modal-star`}>Star Review</title>
                                            <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z"></path>
                                        </svg>
                                        <span className={styles.numReviews}>{numReviewsText}</span>
                                    </>
                                )}
                                {!averageScore && <Text fontSize="md">{numReviewsText} Reviews</Text>}
                            </div>
                        </div>

                        <Text fontSize="md" className={styles.description}>
                            {description}
                        </Text>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AnimeModal;
