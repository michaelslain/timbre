import { FC, useCallback, useState } from 'react'
import Image, { ImageLoader } from 'next/image'
import addLikedSong from '../util/addLikedSong'
import deleteLikedSong from '../util/deleteLikedSong'
import styles from './Slide.module.scss'

// components
import Artists from './Artists'
import SongName from './SongName'

type Props = {
    data: any
    isPlaying: boolean
    handlePlay: any
    handlePause: any
}

const Slide: FC<Props> = ({ data, isPlaying, handlePlay, handlePause }) => {
    const [liked, setLiked] = useState<boolean>(data.liked)

    const handleToggleIsPlaying = () => {
        if (isPlaying) {
            handlePause()
            return
        }

        handlePlay()
    }

    const handleToggleLike = useCallback(async () => {
        const success = liked
            ? await deleteLikedSong(data.id, null)
            : await addLikedSong(data.id, null)

        if (success) setLiked(v => !v)
    }, [data.id, liked])

    const imageLoader: ImageLoader = ({ width }) => {
        const images = data.album.images

        if (width <= 64) return images[2].url
        if (width <= 384) return images[1].url
        return images[0].url
    }

    return (
        <div className={styles.container} onDoubleClick={handleToggleLike}>
            <div className={styles.overlay}></div>
            <div className={styles.imageContainer}>
                <Image
                    loader={imageLoader}
                    src={data.album.images[2].url}
                    alt="album image"
                    objectFit="cover"
                    layout="fill"
                />
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.button} onClick={handleToggleLike}>
                    <Image
                        src={`/liked${liked ? 'Focus' : ''}Icon.svg`}
                        alt="like button"
                        objectFit="fill"
                        layout="fill"
                    />
                </div>
                <div className={styles.button}>
                    <Image
                        src={`/volumeIcon${isPlaying ? 'Play' : 'Pause'}.svg`}
                        alt="mute button"
                        objectFit="fill"
                        layout="fill"
                        onClick={handleToggleIsPlaying}
                    />
                </div>
                <a
                    className={styles.button}
                    href={data.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image
                        src="/linkIcon.svg"
                        alt="like button"
                        objectFit="fill"
                        layout="fill"
                    />
                </a>
            </div>
            <div className={styles.infoContainer}>
                <Artists artists={data.artists} />
                <SongName>{data.name}</SongName>
            </div>
        </div>
    )
}

export default Slide
