import { FC, CSSProperties } from 'react'
import styles from './Heading.module.scss'

type Props = {
    children: any
    size: 1 | 2 | 3
    className?: string
    style?: CSSProperties
}

const Heading: FC<Props> = ({ children, size, className, style }) => {
    const props = {
        style,
        className: [styles.text, styles[String('h' + size)], className].join(
            ' '
        ),
    }

    switch (size) {
        case 1:
            return <h1 {...props}>{children}</h1>
        case 2:
            return <h2 {...props}>{children}</h2>
        case 3:
            return <h3 {...props}>{children}</h3>
    }
}

export default Heading
