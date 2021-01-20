export const buildQuery = (
    queryObject: { [key: string]: number | null },
    baseUrl: string
): string => {
    const queries: string[] = []
    Object.keys(queryObject).forEach((key) => {
        const value = queryObject[key]
        if (value || value === 0) {
            queries.push(`${key}=${value}`)
        }
    })
    return baseUrl + '?' + queries.join('&')
}
