import { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect, useMemo } from 'react'
import { get, set } from '../util/cookieHelper'
import {
    getSpotifyParams,
    spotifyParamsEnumType,
    spotifyParamsType,
} from '../util/spotifyParams'
import styles from './Survey.module.scss'

// components
import Input from '../components/Input'

const COOKIE_EXPIRE_DAYS = 400

type Props = spotifyParamsType

const Survey: NextPage<Props> = props => {
    const [params, setParams]: [spotifyParamsType, any] = useState(props)

    useEffect(() => {
        Object.entries(params).forEach(entry => {
            const [key, value] = entry
            let expiresIn = new Date()
            expiresIn.setDate(expiresIn.getDate() + COOKIE_EXPIRE_DAYS)
            set(key, String(value), null, expiresIn)
        })
    }, [params])

    const inputs = useMemo(
        () =>
            Object.entries(params).map((entry, i) => {
                const [key, value] = entry
                const name = key.charAt(0).toUpperCase() + key.substring(1)
                const onChange = (e: any) =>
                    setParams((oldParams: spotifyParamsType) => ({
                        ...oldParams,
                        [key]: e?.target?.value ?? e,
                    }))
                const min = 0
                const max = key === 'popularity' ? 100 : 1

                return (
                    <Input {...{ min, max, name, value, onChange }} key={i} />
                )
            }),
        [params]
    )

    return <div className={styles.container}>{inputs}</div>
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const props: Props = getSpotifyParams(ctx)

    return { props }
}

export default Survey
