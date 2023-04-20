import { NextPage, GetServerSideProps } from 'next'
import {
    useState,
    useEffect,
    useCallback,
    KeyboardEventHandler,
    MouseEventHandler,
    TouchEventHandler,
    useMemo,
} from 'react'
import getGenres from '../util/getGenres'
import getSongs from '../util/getSongs'
import handleError from '../util/handleError'
import styles from './FYP.module.scss'

// components
import Toolbar from '../components/Toolbar'
import Player from '../components/Player'
import Slide from '../components/Slide'

const SCROLL_THRESHOLD = 50
const MOVE_THRESHOLD = 10
const OFFSET_BIAS = 1

type Props = {
    initialSongs?: Array<any>
    genres?: Array<string>
}

const FYP: NextPage<Props> = ({ initialSongs, genres }) => {
    const [songs, setSongs] = useState(initialSongs ?? [])
    const [reelPosition, setReelPosition] = useState(0)
    const [reelOffset, setReelOffset] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlay = useCallback(() => setIsPlaying(true), [setIsPlaying])
    const handlePause = useCallback(() => setIsPlaying(false), [setIsPlaying])

    const fetchMoreSongs = useCallback(async () => {
        if (Math.abs(reelPosition) !== songs.length - 5) return

        // if scrolled to the bottom and need to fetch
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/getSongs`
        )
        const { songs: newSongs } = await res
            .json()
            .catch(err =>
                handleError('fetching more songs request', JSON.stringify(err))
            )

        setSongs(oldSongs => [...oldSongs, ...newSongs])
    }, [songs.length, reelPosition, setSongs])

    const fetchNewSongs = useCallback(async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/getSongs`
        )
        const { songs: newSongs } = await res
            .json()
            .catch(err =>
                handleError(
                    'json parsing in fetching new songs request',
                    JSON.stringify(err)
                )
            )

        setSongs(_ => newSongs)
    }, [setSongs])

    const scrollUp = useCallback(() => {
        setReelPosition((v: any) => {
            if (v === 0) {
                fetchNewSongs()
                return v
            }

            return v + 1
        })
    }, [setReelPosition, fetchNewSongs])
    const scrollDown = useCallback(
        () => setReelPosition(v => v - 1),
        [setReelPosition]
    )

    // event listener for scrolling with keys
    const keysEventHandler = useCallback<KeyboardEventHandler<Window>>(
        e => {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    scrollUp()
                    break
                case 'ArrowDown':
                case 'KeyS':
                    scrollDown()
                    break
            }
        },
        [scrollDown, scrollUp]
    )

    // event listener (helper) for swiping to scroll
    const mouseMoveHandler = useCallback(
        (e: globalThis.MouseEvent, initialMouseY: number) => {
            const mouseY = e.clientY
            const offset = (initialMouseY - mouseY) * -1

            if (Math.abs(offset) > MOVE_THRESHOLD)
                setReelOffset(offset * OFFSET_BIAS)
        },
        [setReelOffset]
    )

    // event listener (helper) fro swiping to scroll (mobile)
    const touchMoveHandler = useCallback(
        (e: globalThis.TouchEvent, initialTouchY: number) => {
            const touch = e.touches[0]
            const touchY = touch.clientY
            const offset = (initialTouchY - touchY) * -1

            if (Math.abs(offset) > MOVE_THRESHOLD)
                setReelOffset(offset * OFFSET_BIAS)
        },
        [setReelOffset]
    )

    // event listener (helper) for swiping scroll
    const mouseUpHandler = useCallback(
        (e: globalThis.MouseEvent, initialMouseY: number) => {
            const finalMouseY = e.clientY
            const distance = finalMouseY - initialMouseY

            // reset reel
            setReelOffset(0)
            // stop mouse move event
            window.onmousemove = () => {}

            // if not enough movement to scroll
            if (!(Math.abs(distance) > SCROLL_THRESHOLD)) return

            // if enough movement and scrolling down
            if (distance < 0) {
                scrollDown()
                return
            }

            // if enough movement and scroll up
            scrollUp()
        },
        [scrollDown, scrollUp, setReelOffset]
    )

    // event listener (helper) for swiping scroll (mobile)
    const touchEndHandler = useCallback(
        (e: globalThis.TouchEvent, initialTouchY: number) => {
            const touch = e.changedTouches[0]
            const finalTouchY = touch.clientY
            const distance = finalTouchY - initialTouchY

            // reset reel
            setReelOffset(0)
            // stop mouse move event
            window.onmousemove = () => {}

            // if not enough movement to scroll
            if (!(Math.abs(distance) > SCROLL_THRESHOLD)) return

            // if enough movement and scrolling down
            if (distance < 0) {
                scrollDown()
                return
            }

            // if enough movement and scroll up
            scrollUp()
        },
        [scrollDown, scrollUp, setReelOffset]
    )

    // event listener for swiping to sroll
    const swipeMouseEventHandler = useCallback<MouseEventHandler<Window>>(
        e => {
            const initialMouseY = e.clientY

            window.onmousemove = e2 => mouseMoveHandler(e2, initialMouseY)
            window.onmouseup = e2 => mouseUpHandler(e2, initialMouseY)
        },
        [mouseMoveHandler, mouseUpHandler]
    )

    // event listener for swiping to scroll (mobile)
    const swipeTouchEventHandler = useCallback<TouchEventHandler<Window>>(
        e => {
            const touch = e.touches[0]
            const initialTouchY = touch.clientY

            window.ontouchmove = e2 => touchMoveHandler(e2, initialTouchY)
            window.ontouchend = e2 => touchEndHandler(e2, initialTouchY)
        },
        [touchMoveHandler, touchEndHandler]
    )

    const songSlides = useMemo(
        () =>
            songs.map((song, i) => (
                <Slide
                    {...{ isPlaying, handlePlay, handlePause }}
                    key={i}
                    data={song}
                />
            )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [songs, reelPosition, isPlaying, setIsPlaying]
    )

    useEffect(() => {
        //@ts-ignore
        window.addEventListener('keydown', keysEventHandler)
        //@ts-ignore
        window.addEventListener('mousedown', swipeMouseEventHandler)
        //@ts-ignore
        window.addEventListener('touchstart', swipeTouchEventHandler)
    }, [
        scrollUp,
        scrollDown,
        keysEventHandler,
        swipeMouseEventHandler,
        swipeTouchEventHandler,
    ])

    useEffect(() => {
        fetchMoreSongs()
    }, [fetchMoreSongs, reelPosition])

    return (
        <>
            <Player {...{ songs, reelPosition, isPlaying }} />
            <div className={styles.container}>
                <div className={styles.window}>
                    <div
                        className={styles.reel}
                        style={{
                            top:
                                reelPosition *
                                ((globalThis?.window?.innerHeight ?? 100) -
                                    100),
                            marginTop: reelOffset,
                        }}
                    >
                        <div>{songSlides}</div>
                    </div>
                </div>
                <Toolbar />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const genres = await getGenres(ctx)
    const initialSongs = await getSongs(ctx)

    return { props: { genres, initialSongs } }
}

export default FYP
