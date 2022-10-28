import { FC } from 'react'
import styles from './Loading.module.scss'

// components
import Heading from './Heading'

const Loading: FC = () => {
    return (
        <div className={styles.container}>
            <Heading size={1}>
                Loading
                <div className={styles.trail}>
                    {new Array(3).fill(1).map((_, i) => (
                        <div key={i} className={styles.dot}>
                            .
                        </div>
                    ))}
                </div>
            </Heading>
        </div>
    )
}

export default Loading
