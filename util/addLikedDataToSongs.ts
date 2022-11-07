import createUrlQuery from './createUrlQuery'
import handleError from './handleError'
import handleTokens from './handleTokens'

const GET_IF_LIKED_URL =
    process.env.NEXT_PUBLIC_SPOTIFY_API_URL + '/v1/me/tracks/contains'

const addLikedDataToSongs = async (songs: Array<any>, ctx: any) => {
    const accessToken = await handleTokens(ctx)
    if (!accessToken) return null

    const data = {
        ids: songs.map(song => song.id).join(','),
    }

    // liked songs contains request
    const url = createUrlQuery(GET_IF_LIKED_URL, data)

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const json = await res
        .json()
        .catch(err =>
            handleError(
                'json parsing get if liked songs contains request',
                JSON.stringify(err)
            )
        )

    if (res.status !== 200) {
        await handleError(
            'get if liked songs contains request',
            json.error.message
        )
        return null
    }

    // add liked data to each song
    const songsWithLikedData = songs.map((song, i) => {
        if (json[i]) song.liked = true
        else song.liked = false
        return song
    })
    return songsWithLikedData
}

export default addLikedDataToSongs
