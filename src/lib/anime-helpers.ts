/**
 *
 * @param numReviews An integer represting the number of reviews
 * @returns
 */
export function getNumReviewsText(numReviews: number): string {
    if (numReviews < 1000) return `${numReviews}`;

    return `${Math.floor(numReviews / 1000)}K`;
}

/**
 * Given a distribution of user scores, calculate the total number of reviews
 * @param scoreDistribution The distribution of user scores
 * @returns The number of reviews
 */
export function calcNumReview(scoreDistribution: { score: number; amount: number }[]): number {
    return scoreDistribution.reduce((acc, curr) => acc + curr.amount, 0);
}

/**
 * Format the description text to be more display friendly
 * @param description A string representing the description of an anime
 * @returns A more display friendly version of the description
 */
export function formatDescription(description: string | null): string {
    return description?.replace(/<br\s*\/?>/gi, '\n') ?? '';
}

/**
 * Given an average score out of 100, return a number out of 10
 * @param averageScore A number representing the average score of an anime
 * @returns The average score in display format
 */
export function getAverageScoreDisplayNumber(averageScore: number): number {
    return averageScore / 10;
}
