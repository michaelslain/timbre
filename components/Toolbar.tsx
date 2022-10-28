import { FC, useMemo, useState } from 'react'
import styles from './Toolbar.module.scss'

// components
import Icon from './Icon'

const DATA = ['liked', 'fyp', 'burger']

const Toolbar: FC = () => {
    const [hoverStates, setHoverStates] = useState({
        liked: false,
        fyp: false,
        settings: false,
    })
    const [reloadCounter, setReloadCounter] = useState(0)

    const forceRefresh = () => setReloadCounter(v => v + 1)

    const handleUpdateHoverState = (key: string, value: boolean) => {
        setHoverStates((oldHoverStates: any) => {
            oldHoverStates[key] = value
            return oldHoverStates
        })

        forceRefresh()
    }

    const icons = useMemo(
        () => {
            return DATA.map((data, i) => (
                <Icon
                    key={i}
                    {...{ data, hoverStates }}
                    setHoverStates={handleUpdateHoverState}
                />
            ))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [hoverStates, setHoverStates, reloadCounter]
    )

    return <div className={styles.container}>{icons}</div>
}

export default Toolbar
