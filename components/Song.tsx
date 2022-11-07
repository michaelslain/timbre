import { FC, useRef, useEffect } from 'react'
import Image from 'next/image'
import deleteLikedSong from '../util/deleteLikedSong'
import styles from './Song.module.scss'

type Props = {
    artists: Array<any>
    externalUrl: string
    previewUrl: string
    name: string
    id: string
    setSongs: any
}

const Song: FC<Props> = ({
    artists,
    externalUrl,
    previewUrl,
    name,
    id,
    setSongs,
}) => {
    // unlikes the song for the user on spotify
    const handleDelteSong = async () => {
        const success = await deleteLikedSong(id, null)

        if (success) {
            // remove song from local state
            setSongs((songs: Array<any>) =>
                songs.filter(song => {
                    return song.track.id !== id
                })
            )
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.name}>{name}</p>
            <p className={styles.artists}>
                By: {artists.map(artist => artist.name).join(' ')}
            </p>
            <a
                className={styles.openButton}
                href={externalUrl}
                target="_blank"
                rel="noreferrer"
            >
                <Image
                    src="/linkIcon.svg"
                    alt="open in spotify"
                    objectFit="fill"
                    layout="fill"
                />
            </a>
            <p onClick={handleDelteSong} className={styles.deleteButton}>
                Delete
            </p>
        </div>
    )
}

export default Song
