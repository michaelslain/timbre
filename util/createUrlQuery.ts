const createUrlQuery = (url: string, data: any) => {
    const queryParams = Object.entries(data).map(entry => {
        const [key, value] = entry
        return `${key}=${encodeURIComponent(String(value))}`
    })
    const query = queryParams.join('&')
    return `${url}?${query}`
}

export default createUrlQuery
