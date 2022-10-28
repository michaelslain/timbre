import { createContext } from 'react'

const SpotifyAccessTokenContext = createContext(null)
export default SpotifyAccessTokenContext

export const SpotifyAccessTokenContextProvider =
    SpotifyAccessTokenContext.Provider
