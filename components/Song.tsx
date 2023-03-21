import { FC } from 'react'
import Image from 'next/image'
import deleteLikedSong from '../util/deleteLikedSong'
import styles from './Song.module.scss'

// components
import Icon from './Icon'

type Props = {
    artists: Array<any>
    externalUrl: string
    previewUrl: string
    name: string
    id: string
    setSongs: any
}

const Song: FC<Props> = ({ artists, externalUrl, name, id, setSongs }) => {
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
            <div className={styles.dataContainer}>
                <p className={styles.name}>{name}</p>
                <p className={styles.artists}>
                    By: {artists.map(artist => artist.name).join(', ')}
                </p>
            </div>
            <div className={styles.buttonContainer}>
                <Icon icon="link" href={externalUrl} target="_blank" />
                <Icon icon="delete" onClick={handleDelteSong} />
            </div>
        </div>
    )
}

export default Song
