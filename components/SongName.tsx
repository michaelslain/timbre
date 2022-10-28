import { FC } from 'react'
import styles from './SongName.module.scss'

// components
import Label from './Label'

type Props = {
    children: any
}

const SongName: FC<Props> = ({ children }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>{children}</h1>
        </div>
    )
}

export default SongName
