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

    // handles the hover animations
    const handleUpdateHoverState = (key: string, value: boolean) => {
        setHoverStates((oldHoverStates: any) => {
            oldHoverStates[key] = value
            return oldHoverStates
        })

        forceRefresh()
    }

    // converts tool bar into settings nav
    const handleSettingsNav = () => {}

    const icons = useMemo(
        () => {
            return DATA.map((data, i) => (
                <a
                    key={i}
                    // makes burger menu open settings nav
                    onClick={data === 'burger' ? handleSettingsNav : () => {}}
                >
                    <Icon
                        {...{ data, hoverStates }}
                        setHoverStates={handleUpdateHoverState}
                    />
                </a>
            ))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [hoverStates, setHoverStates, reloadCounter]
    )

    return <div className={styles.container}>{icons}</div>
}

export default Toolbar
