import App, { AppProps, AppContext } from 'next/app'
import auth from '../util/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.scss'

// components
import Head from '../components/Head'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head />
            <ToastContainer />
            <Component {...pageProps} />
        </>
    )
}

MyApp.getInitialProps = async (ctx: AppContext) => {
    const appCtx = await App.getInitialProps(ctx)

    auth(ctx.ctx)

    return appCtx
}

export default MyApp
