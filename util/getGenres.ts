import handleTokens from './handleTokens'
import handleError from './handleError'

const GET_GENRES_URL =
    process.env.NEXT_PUBLIC_SPOTIFY_API_URL +
    '/v1/recommendations/available-genre-seeds'

const getGenres = async (ctx: any): Promise<Array<string> | null> => {
    try {
        const accessToken = await handleTokens(ctx)
        if (!accessToken) return null

        const res = await fetch(GET_GENRES_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        const json: any = await res
            .json()
            .catch(err =>
                handleError(
                    'json parsing get genres request',
                    JSON.stringify(err)
                )
            )

        if (res.status !== 200) {
            await handleError('get genres request', json.error.message)
            return null
        }

        return json.genres
    } catch (err) {
        handleError('get genres api', JSON.stringify(err))
        return null
    }
}

export default getGenres
