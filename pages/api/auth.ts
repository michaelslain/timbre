import { NextApiRequest, NextApiResponse } from 'next'
import jsonToForm from '../../util/jsonToForm'

type Data = {
    accessToken?: String
    refreshToken?: String
    expiresIn?: number
    err?: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        // if using auth code to get access token
        const authCode = req.cookies['auth-code']

        if (authCode !== 'undefined' && authCode != null) {
            // fetch request
            const response = await fetch(
                process.env.SPOTIFY_REQUEST_TOKEN_ENDPOINT ?? '',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${Buffer.from(
                            `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                        ).toString('base64')}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: jsonToForm({
                        code: authCode,
                        redirect_uri:
                            process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
                        grant_type: 'authorization_code',
                    }),
                }
            )
            const json = await response.json()

            // if fetch was successful
            if (response.status === 200) {
                const {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    expires_in: expiresIn,
                } = json

                res.status(200).json({ accessToken, refreshToken, expiresIn })
                return
            }

            // if fetch wasn't successful
            const err = `${json.error}: ${json.error_description}`
            res.status(response.status).json({ err })
            return
        }

        const refreshToken =
            req.query?.refreshToken ?? req.cookies['refresh-token']
        const accessToken = req.cookies['access-token']

        // if user already has access token
        if (accessToken && accessToken !== 'undefined') {
            res.status(200).json({})
            return
        }

        // if there's a refresh token but no access token, use the access token to get a refresh token
        if (refreshToken && refreshToken !== 'undefined') {
            // fetch request
            const response = await fetch(
                process.env.SPOTIFY_REQUEST_TOKEN_ENDPOINT ?? '',
                {
                    method: 'POST',
                    body: jsonToForm({
                        grant_type: 'refresh_token',
                        refresh_token: refreshToken,
                    }),
                    headers: {
                        Authorization: `Basic ${Buffer.from(
                            `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                        ).toString('base64')}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            const json = await response.json()

            // if fetch was successful
            if (response.status === 200) {
                const {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                } = json

                let jsonRes: Data = { accessToken }
                if (refreshToken) jsonRes = { ...jsonRes, refreshToken }

                res.status(200).json(jsonRes)
                return
            }

            // if fetch wasn't successful
            const err = `${json.error}: ${json.error_description}`
            res.status(response.status).json({ err })
            return
        }

        // if none of the requirements are met for authorization
        res.status(200).json({})
    } catch (err) {
        res.status(500).json({ err })
    }
}
