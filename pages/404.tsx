import { NextPage } from 'next'
import styles from './404.module.scss'

const _404: NextPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Error 404</h1>
        </div>
    )
}

export default _404
