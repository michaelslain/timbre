import { FC } from 'react'
import styles from './Label.module.scss'

type Props = {
    children: any
}

const Label: FC<Props> = ({ children }) => {
    return <p className={styles.text}>{children}</p>
}

export default Label
