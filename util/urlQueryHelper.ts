const urlQueryHelper = (): any => {
    const url = window.location.href
    const queryIndex = url.indexOf('?')

    // if there is no query in url
    if (queryIndex === -1) return

    // if there is query
    let data: any = {}
    const query = url.substring(queryIndex + 1)
    const tokens = query.split('&')

    tokens.forEach(token => {
        const [key, value] = token.split('=')
        data[key] = value
    })

    return data
}

export default urlQueryHelper
