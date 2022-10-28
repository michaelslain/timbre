import handleTokens from './handleTokens'
import handleError from './handleError'
import createUrlQuery from './createUrlQuery'

const GET_TOP_ARTISTS_URL =
    process.env.NEXT_PUBLIC_SPOTIFY_API_URL + '/v1/me/top/artists'
const GET_SONGS_URL =
    process.env.NEXT_PUBLIC_SPOTIFY_API_URL + '/v1/recommendations'

const getSongs = async (ctx: any) => {
    const accessToken = await handleTokens(ctx)
    if (!accessToken) return null

    // get seed values for recommendations request
    const topArtists = await getTopArtists(ctx)
    const randomTopArtists = getMultipleRandom(
        topArtists.map((artist: any) => artist.id),
        5
    )

    const data = {
        seed_artists: randomTopArtists.join(','),
        limit: 10,
    }

    // recommendations request
    const url = createUrlQuery(GET_SONGS_URL, data)

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const json = await res.json()

    if (res.status !== 200) {
        await handleError(
            'get song recommendations request',
            `${json.error}: ${json.error_description}`
        )
        return null
    }

    return json.tracks
}

const getTopArtists = async (ctx: any) => {
    try {
        const accessToken = await handleTokens(ctx)
        if (!accessToken) return null

        const data = {
            limit: 30,
        }
        const url = createUrlQuery(GET_TOP_ARTISTS_URL, data)

        // top artists request
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })

        const json = await res
            .json()
            .catch(err => handleError('top artists json parsing', err))

        if (res.status !== 200) {
            await handleError('get top artists requests', json.error.message)
            return null
        }

        return json.items
    } catch (err) {
        handleError('get top artists function', JSON.stringify(err))
        return null
    }
}

const getMultipleRandom = (songs: Array<any>, amount: number): Array<any> => {
    const shuffled = [...songs].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, amount)
}

export default getSongs
