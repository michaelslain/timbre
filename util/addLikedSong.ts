import handleTokens from './handleTokens'
import handleError from './handleError'
import createUrlQuery from './createUrlQuery'

const ADD_LIKED_SONG_URL =
    process.env.NEXT_PUBLIC_SPOTIFY_API_URL + '/v1/me/tracks'

const addLikedSong = async (id: string, ctx: any): Promise<boolean> => {
    const accessToken = await handleTokens(ctx)
    if (!accessToken) return false

    const data = {
        ids: id,
    }

    // add liked song request
    const url = createUrlQuery(ADD_LIKED_SONG_URL, data)

    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const json = await res
        .json()
        .catch(_ => console.log(`guess it's supposed to happen`))

    if (res.status !== 200) {
        await handleError('add liked song request', json.error.message)
        return false
    }

    return true
}

export default addLikedSong
