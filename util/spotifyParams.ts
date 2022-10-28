import { get } from './cookieHelper'

const SPOTIFY_PARAMS = [
    'acousticness',
    'danceability',
    'energy',
    'instrumentalness',
    'liveness',
    'popularity',
    'happiness',
] as const

export default SPOTIFY_PARAMS

export const DEFAULT_PARAMS: spotifyParamsType = {
    acousticness: null,
    danceability: null,
    energy: null,
    instrumentalness: null,
    liveness: null,
    popularity: null,
    happiness: null,
}

export type spotifyParamsType = {
    acousticness: number | null
    danceability: number | null
    energy: number | null
    instrumentalness: number | null
    liveness: number | null
    popularity: number | null
    happiness: number | null
}

export type spotifyParamsEnumType = typeof SPOTIFY_PARAMS[number]

export const getSpotifyParams = (ctx: any): spotifyParamsType =>
    SPOTIFY_PARAMS.reduce((obj, param: spotifyParamsEnumType) => {
        let value = get(param, ctx)
        if (value === 'null' || value === undefined) value = null

        return { ...obj, [param]: value }
    }, DEFAULT_PARAMS)
