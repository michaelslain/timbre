import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './Icon.module.scss'

type Props = {
    data: string
    hoverStates: any
    setHoverStates: any
}

const Icon: FC<Props> = ({ data, hoverStates, setHoverStates }) => {
    const router = useRouter()

    const link = data !== 'burger' ? `/${data}` : ''

    const isFocus = router.asPath === link
    const isHover = hoverStates[data]

    const src = `/${data}${isFocus ? 'Focus' : isHover ? 'Hover' : ''}Icon.svg`

    const onClick = () => {
        if (isFocus) return

        if (data === 'burger')
            // TODO burger menu
            return

        router.push(link)
    }
    const onMouseOver = () => setHoverStates(data, true)
    const onMouseOut = () => setHoverStates(data, false)

    return (
        <div
            {...{ onClick, onMouseOver, onMouseOut }}
            className={styles.container}
        >
            <Image {...{ src }} alt={data} layout="fill" objectFit="fill" />
        </div>
    )
}

export default Icon
