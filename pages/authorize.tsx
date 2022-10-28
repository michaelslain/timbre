import { NextPage } from 'next'
import { useMemo, useEffect } from 'react'
import { toast } from 'react-toastify'
import createUrlQuery from '../util/createUrlQuery'
import styles from './Authorize.module.scss'

// components
import Heading from '../components/Heading'
import Button from '../components/Button'

const Authorize: NextPage = () => {
    const loginUrl = useMemo(() => {
        const url = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_CODE_ENDPOINT ?? ''
        const data = {
            client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
            redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
            scope: process.env.NEXT_PUBLIC_SPOTIFY_API_SCOPES,
            response_type: 'code',
        }

        return createUrlQuery(url, data)
    }, [])

    useEffect(() => {
        toast.error(localStorage.getItem('error'), { theme: 'colored' })
        localStorage.removeItem('error')
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <Heading size={3}>Welcome to Timbre</Heading>
                <div className={styles.buttonContainer}>
                    <Button href={loginUrl} type="primary">
                        Sign Up With Spotify
                    </Button>
                    <Button href={loginUrl} type="secondary">
                        Login In With Spotify
                    </Button>
                </div>
            </div>
            <div className={styles.overlay}></div>
        </div>
    )
}

export default Authorize
