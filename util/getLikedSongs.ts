import createUrlQuery from './createUrlQuery'
import handleError from './handleError'
import handleTokens from './handleTokens'

const GET_TOP_ARTISTS_URL =
    process.env.NEXT_PUBLIC_SPOTIFY_API_URL + '/v1/me/tracks'

const getLikedSongs = async (offset: number, ctx: any) => {
    const accessToken = await handleTokens(ctx)
    if (!accessToken) return null

    const data = { limit: 20, offset }

    // get liked songs request
    const url = createUrlQuery(GET_TOP_ARTISTS_URL, data)

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    const json = await res
        .json()
        .catch(err => handleError('liked songs json parsing', err))

    if (res.status !== 200) {
        await handleError('get liked songs request', json.error.message)
        return null
    }

    return json.items
}

export default getLikedSongs
