import { get, set } from './cookieHelper'
import handleError from './handleError'

const handleTokens = async (ctx: any): Promise<boolean | string> => {
    try {
        const accessToken = get('access-token', ctx)

        // if access token is expired
        if (!accessToken) {
            const refreshToken = get('refresh-token', ctx)
            const res = await fetch(
                process.env.NEXT_PUBLIC_DOMAIN +
                    `/api/auth?refreshToken=${refreshToken}`
            )
            const json = await res
                .json()
                .catch(err =>
                    handleError(
                        'json parsing refresh token request',
                        JSON.stringify(err)
                    )
                )

            // if request didn't go well
            if (res.status !== 200) {
                await handleError('requesting /api/auth', json.err)
                return false
            }

            // request did go well
            let expiresIn = new Date()
            expiresIn.setHours(expiresIn.getHours() + 1)
            set('access-token', json.accessToken, ctx, expiresIn)

            if (json.refreshToken) {
                expiresIn = new Date()
                expiresIn.setDate(expiresIn.getDate() + 400)
                set('refresh-token', json.refreshToken, ctx, expiresIn)
            }

            return get('access-token', ctx) ?? false
        }

        return accessToken
    } catch (err) {
        handleError('handleTokens util', JSON.stringify(err))
        return false
    }
}

export default handleTokens
