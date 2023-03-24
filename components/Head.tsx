import { FC } from 'react'
import Head from 'next/head'

const CustomHead: FC = () => {
    return (
        <Head>
            <title>Timbre</title>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
        </Head>
    )
}

export default CustomHead
