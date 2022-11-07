import createUrlQuery from './createUrlQuery'
import handleError from './handleError'
import handleTokens from './handleTokens'

const DELETE_LIKED_SONG_URL =
    process.env.NEXT_PUBLIC_SPOTIFY_API_URL + '/v1/me/tracks'

const deleteLikedSong = async (id: string, ctx: any): Promise<boolean> => {
    const accessToken = await handleTokens(ctx)
    if (!accessToken) return false

    const data = {
        ids: id,
    }

    // delete liked song request
    const url = createUrlQuery(DELETE_LIKED_SONG_URL, data)

    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const json = await res
        .json()
        .catch(_ => console.log(`guess it's supposed to happen`))

    if (res.status !== 200) {
        await handleError('delete liked song request', json.error.message)
        return false
    }

    return true
}

export default deleteLikedSong
