import { FC, useMemo, useState } from 'react'
import styles from './Toolbar.module.scss'

// components
import Icon from './Icon'

const Toolbar: FC = () => {
    return (
        <div className={styles.container}>
            <Icon icon="heart" href="/liked" />
            <Icon icon="home" href="/fyp" />
        </div>
    )
}

export default Toolbar
