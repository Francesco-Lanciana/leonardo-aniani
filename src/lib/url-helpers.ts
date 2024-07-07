/**
 * Get the current URL with an updated query parameter
 * @param param The query parameter to update
 * @param newValue The new value for the query parameter
 * @returns The URL object with the updated query parameter
 */
export function updateQueryParam(param: string, newValue: string): URL {
    const url = new URL(window.location.href);
    url.searchParams.set(param, newValue);

    return url;
}
