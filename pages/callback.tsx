import { NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { set, del } from '../util/cookieHelper'
import urlHashHelper from '../util/urlQueryHelper'
import handleError from '../util/handleError'

// components
import Loading from '../components/Loading'

const Callback: NextPage = () => {
    const router = useRouter()

    const authorize = async () => {
        const { code: authCode } = urlHashHelper()

        // temporarily save the authCode in cookies
        let expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + 400)
        set('auth-code', authCode, null, expiresIn)

        const res = await fetch(`/api/auth`)
        const json = await res
            .json()
            .catch(err =>
                handleError(
                    'json parsing error from /api/auth response',
                    JSON.stringify(err)
                )
            )

        // if request went wrong
        if (res.status !== 200 || !json.accessToken) {
            localStorage.setItem('error', json.err)
            del('auth-code', null)
            del('access-token', null)
            del('refresh-token', null)
            router.push('/authorize')
            return
        }

        // set refresh and access tokens
        expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + 400)
        set('refresh-token', json.refreshToken, null, expiresIn)

        expiresIn = new Date()
        expiresIn.setSeconds(expiresIn.getSeconds() + json.expiresIn)
        set('access-token', json.accessToken, null, expiresIn)

        del('auth-code', null)
        router.push('/fyp')
    }

    useEffect(() => {
        authorize()
    }, [])

    return <Loading />
}

export default Callback
