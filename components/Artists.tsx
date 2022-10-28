import { FC, memo } from 'react'
import styles from './Artists.module.scss'

// components
import Label from './Label'

type Props = {
    artists: Array<any>
}

const Artists: FC<Props> = ({ artists }) => {
    const renderedArtists = artists.map((artist, i) => (
        <a
            className={styles.link}
            key={i}
            href={artist.external_urls.spotify}
            rel="noreferrer"
            target="_blank"
        >
            {artist.name}
            {i === artists.length - 1 ? '' : ','}
        </a>
    ))

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <p className={styles.text}>By: </p>
                {renderedArtists}
            </div>
        </div>
    )
}

export default memo(Artists)
