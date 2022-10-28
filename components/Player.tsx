import { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import handleError from '../util/handleError'
import isServer from '../util/isServer'

const INITIAL_VOLUME = 1 // 0-1

type Props = {
    songs: Array<any>
    reelPosition: number
    isPlaying: boolean
    handlePlay: any
    handlePause: any
}

const Player: FC<Props> = ({
    songs,
    reelPosition,
    isPlaying,
    handlePlay,
    handlePause,
}) => {
    const src = useMemo(
        () => (songs ? songs[Math.abs(reelPosition)]?.preview_url : ''),
        [songs, reelPosition]
    )

    console.log(songs[Math.abs(reelPosition)])

    let audioPlayerRef: any = useRef()

    const handleLocalPlay = () => isPlaying && audioPlayerRef?.current?.play()

    useEffect(() => {
        if (!audioPlayerRef?.current) {
        } else if (isPlaying) audioPlayerRef.current.play()
        else audioPlayerRef.current.pause()
    }, [isPlaying])

    return (
        <audio
            {...{ src }}
            ref={audioPlayerRef}
            onTimeUpdate={handleLocalPlay}
            loop
        ></audio>
    )
}

export default Player
