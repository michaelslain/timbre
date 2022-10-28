import { NextApiRequest, NextApiResponse } from 'next'
import getSongs from '../../util/getSongs'

type Data = {
    songs?: Array<any>
    err?: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const ctx = { req, res }
        const songs = await getSongs(ctx)

        res.status(200).json({ songs })
    } catch (err) {
        res.status(500).json({ err })
    }
}
