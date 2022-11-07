import { NextPage, GetServerSideProps } from 'next'
import { useMemo, useState, useCallback } from 'react'
import styles from './Liked.module.scss'
import getLikedSongs from '../util/getLikedSongs'

// components
import Toolbar from '../components/Toolbar'
import Heading from '../components/Heading'
import Song from '../components/Song'
import Button from '../components/Button'

type Props = {
    initialSongs?: Array<any>
}

const Liked: NextPage<Props> = ({ initialSongs }) => {
    const [songs, setSongs] = useState(initialSongs ?? [])

    const loadMore = useCallback(async () => {
        const newLikedSongs = await getLikedSongs(songs.length, null)

        setSongs(v => [...(v ?? []), ...(newLikedSongs ?? [])])
    }, [songs])

    const renderedSongs = useMemo(
        () =>
            songs?.map(({ track }, i) => (
                <Song
                    {...{ setSongs }}
                    key={i}
                    artists={track.artists}
                    externalUrl={track.external_urls.spotify}
                    previewUrl={track.perview_url}
                    id={track.id}
                    name={track.name}
                />
            )),
        [songs]
    )

    return (
        <div className={styles.container}>
            <Heading size={3}>Liked Songs</Heading>
            <div className={styles.innerContainer}>{renderedSongs}</div>
            <Button
                type="secondary"
                onClick={loadMore}
                className={styles.button}
            >
                Load More
            </Button>
            <Toolbar />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
    const likedSongs = await getLikedSongs(0, ctx)

    return { props: { initialSongs: likedSongs } }
}

export default Liked
