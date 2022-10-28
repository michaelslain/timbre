import { FC, useState } from 'react'
import Image from 'next/image'
import styles from './Slide.module.scss'

// components
import Artists from './Artists'
import SongName from './SongName'

type Props = {
    data: any
    reelPosition: number
    likedSongs?: Array<string>
    isPlaying: boolean
    handlePlay: any
    handlePause: any
}

const Slide: FC<Props> = ({
    data,
    reelPosition,
    likedSongs,
    isPlaying,
    handlePlay,
    handlePause,
}) => {
    // console.log(data)

    const onDoubleClick = () => {}

    const handleToggleIsPlaying = () => {
        if (isPlaying) {
            handlePause()
            return
        }

        handlePlay()
    }

    return (
        <div {...{ onDoubleClick }} className={styles.container}>
            <div className={styles.overlay}></div>
            <div className={styles.imageContainer}>
                <Image
                    src={data.album.images[0].url}
                    alt="album image"
                    objectFit="cover"
                    layout="fill"
                />
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.button}>
                    <Image
                        src="/likedIcon.svg"
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
