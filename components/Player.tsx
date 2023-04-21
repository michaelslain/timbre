import { FC, useState, useEffect } from 'react'
import isServer from '../util/isServer'

type Props = {
    songs: Array<any>
    reelPosition: number
    isPlaying: boolean
}

const Player: FC<Props> = ({ songs, reelPosition, isPlaying }) => {
    const [loadedAudio, setLoadedAudio] = useState<Array<HTMLAudioElement>>([])

    // convert links into playable audio
    useEffect(() => {
        setLoadedAudio((v: any) => {
            const newSongs = songs.slice(loadedAudio.length)
            const newAudios = newSongs.map(song => {
                const audio = new Audio(song.preview_url)
                audio.loop = true
                return audio
            })

            return [...v, ...newAudios]
        })
    }, [songs, setLoadedAudio, loadedAudio.length])

    // play the right audio
    useEffect(() => {
        if (loadedAudio.length !== 0) {
            const index = Math.abs(reelPosition)

            if (!isServer() && isPlaying) {
                loadedAudio[index - 1]?.pause()
                loadedAudio[index + 1]?.pause()
                loadedAudio[index]?.play()
            } else loadedAudio[index]?.pause()
        }

        // prevent audio from playing when switching pages
        return () => {
            loadedAudio.forEach(audio => audio.pause())
        }
    }, [isPlaying, loadedAudio, loadedAudio.length, reelPosition])

    return <></>
}

export default Player
