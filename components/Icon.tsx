import { FC, useState, ReactNode } from 'react'
import Link from 'next/link'
import {
    AiFillHeart,
    AiOutlineHeart,
    AiFillHome,
    AiOutlineHome,
    AiOutlineSound,
    AiFillSound,
    AiOutlineLink,
    AiFillDelete,
    AiOutlineDelete,
} from 'react-icons/ai'
import styles from './Icon.module.scss'

type Props = {
    href?: string
    onClick?: () => any
    icon: string
    target?: string
}

const Icon: FC<Props> = ({ href, icon, onClick, target }) => {
    const [hover, setHover] = useState(false)

    const onMouseOver = () => setHover(true)
    const onMouseOut = () => setHover(false)

    let HoverIcon: ReactNode
    let NormalIcon: ReactNode

    switch (icon) {
        case 'heart':
            HoverIcon = <AiFillHeart className={styles.icon} fill="#02d684" />
            NormalIcon = <AiOutlineHeart className={styles.icon} />
            break
        case 'unliked':
            HoverIcon = <AiFillHeart className={styles.icon} fill="#02d684" />
            NormalIcon = <AiOutlineHeart className={styles.icon} />
            break
        case 'liked':
            HoverIcon = <AiFillHeart className={styles.icon} fill="#02d684" />
            NormalIcon = <AiFillHeart className={styles.icon} fill="#02d684" />
            break
        case 'home':
            HoverIcon = <AiFillHome className={styles.icon} fill="#02d684" />
            NormalIcon = <AiOutlineHome className={styles.icon} />
            break
        case 'mute':
            HoverIcon = <AiFillSound className={styles.icon} fill="#02d684" />
            NormalIcon = <AiOutlineSound className={styles.icon} />
            break
        case 'playing':
            HoverIcon = <AiFillSound className={styles.icon} fill="#02d684" />
            NormalIcon = <AiFillSound className={styles.icon} fill="#02d684" />
            break
        case 'link':
            HoverIcon = <AiOutlineLink className={styles.icon} />
            NormalIcon = <AiOutlineLink className={styles.icon} />
            break
        case 'delete':
            HoverIcon = <AiFillDelete className={styles.icon} fill="#02d684" />
            NormalIcon = <AiOutlineDelete className={styles.icon} />
            break
        default:
            HoverIcon = <></>
            NormalIcon = <></>
            break
    }

    return (
        <>
            {href ? (
                <Link {...{ href, target }}>
                    <a
                        {...{ onClick, onMouseOver, onMouseOut }}
                        className={styles.container}
                    >
                        {hover ? HoverIcon : NormalIcon}
                    </a>
                </Link>
            ) : (
                <a
                    {...{ onClick, onMouseOver, onMouseOut }}
                    className={styles.container}
                >
                    {hover ? HoverIcon : NormalIcon}
                </a>
            )}
        </>
    )
}

export default Icon
