/**
 * Get a cookie value by it's name on the client side
 * @param cookieName The name of the cookie whose value we want to get
 * @returns The value of the corresponding cookie (or an empty string if the cookie doesn't exist)
 */
export function getCookie(cookieName: string): string {
    if (typeof document === 'undefined') return '';

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);

    if (parts && parts.length === 2) {
        const rawValue = parts.pop()?.split(';').shift() ?? '';
        return decodeURIComponent(rawValue);
    } else return '';
}
