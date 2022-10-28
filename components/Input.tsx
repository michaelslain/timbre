import { FC, ChangeEventHandler } from 'react'
import styles from './Input.module.scss'

type Props = {
    name: string
    value: any
    onChange: any
    min?: number
    max?: number
}

const DEFAULT_VALUE = 0.5

const Input: FC<Props> = ({ name, value, onChange, min = 0, max = 1 }) => {
    const onCheckBox: ChangeEventHandler<HTMLInputElement> = e => {
        if (e.target.checked) {
            onChange(String(DEFAULT_VALUE))
            return
        }

        onChange(null)
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>{name}</label>
            <input
                type="checkbox"
                className={styles.checkBox}
                value="true"
                onChange={onCheckBox}
                defaultChecked={Boolean(value)}
            />
            {value ? (
                <input
                    {...{ name, value, onChange, min, max }}
                    step="0.01"
                    type="range"
                    className={styles.input}
                />
            ) : null}
        </div>
    )
}

export default Input
