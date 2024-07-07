import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import styles from './Nav.module.scss';
import { List, ListItem, UnorderedList } from '@chakra-ui/react';

interface NavProps {
    numPagesTotal: number;
    numPagesToShow: number;
    currentPage: number;
    onSelectPage: (page: number) => void;
}

function getFirstPageOptionNumber(
    currentPage: number,
    numPagesTotal: number,
    numPagesToShow: number
): number {
    if (currentPage > numPagesTotal - numPagesToShow + 1) return numPagesTotal - numPagesToShow + 1;
    else return Math.max(1, currentPage - Math.floor(numPagesToShow / 2));
}

const Nav: React.FC<NavProps> = ({ numPagesTotal, numPagesToShow, currentPage, onSelectPage }) => {
    const firstPageOption = getFirstPageOptionNumber(currentPage, numPagesTotal, numPagesToShow);
    const pageOptions = Array.from({ length: numPagesToShow }, (_, i) => i + firstPageOption);

    return (
        <nav className={styles.nav}>
            <List className={styles.pageSelectorOptions}>
                <ListItem className={styles.pageSelectorItem}>
                    <button
                        className={styles.pageButton}
                        onClick={() => onSelectPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label={`Go to page ${firstPageOption}`}
                    >
                        <ArrowBackIcon />
                    </button>
                </ListItem>
                {pageOptions.map((page) => (
                    <ListItem
                        className={styles.pageSelectorItem}
                        key={page}
                        data-selected={currentPage === page}
                    >
                        <button
                            className={styles.pageButton}
                            onClick={() => onSelectPage(page)}
                            disabled={currentPage === page}
                            aria-label={`Go to page ${page}`}
                        >
                            {page}
                        </button>
                    </ListItem>
                ))}
                <ListItem className={styles.pageSelectorItem}>
                    <button
                        className={styles.pageButton}
                        onClick={() => onSelectPage(currentPage + 1)}
                        disabled={currentPage === numPagesTotal}
                        aria-label={`Go to page ${currentPage + 1}`}
                    >
                        <ArrowForwardIcon />
                    </button>
                </ListItem>
            </List>
        </nav>
    );
};

export default Nav;
