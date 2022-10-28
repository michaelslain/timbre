import { CSSProperties, FC, MouseEventHandler } from 'react'
import styles from './Button.module.scss'

type Props = {
    children: any
    onClick?: MouseEventHandler<HTMLAnchorElement>
    className?: string
    style?: CSSProperties
    type: 'primary' | 'secondary'
    href?: string
}

const Button: FC<Props> = ({
    children,
    onClick,
    className,
    style,
    type,
    href,
}) => {
    return (
        <a
            {...{ onClick, style, href }}
            className={[styles.button, styles[type], className].join(' ')}
        >
            {children}
        </a>
    )
}

export default Button
