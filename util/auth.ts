import { NextPageContext } from 'next'
import { get } from './cookieHelper'
import Router from 'next/router'

const LOGIN_PAGES = ['/authorize', '/callback']

export default function auth(ctx: NextPageContext) {
    const refreshToken = get('refresh-token', ctx)
    let path = ctx.asPath ?? window.location.href

    // !! temp
    if (path === '/' && refreshToken && ctx.res) {
        ctx.res.writeHead(307, { Location: '/fyp' })
        ctx.res.end()
        return
    }
    if (path === '/' && refreshToken) {
        Router.replace('/fyp')
        return
    }
    if (path === '/' && !refreshToken && ctx.res) {
        ctx.res.writeHead(307, { Location: '/authorize' })
        ctx.res.end()
        return
    }
    if (path === '/' && !refreshToken) {
        Router.replace('/authorize')
        return
    }

    // get path without query
    const queryIndex = path.indexOf('?')
    if (queryIndex !== -1) path = path.substring(0, queryIndex)

    // not logged in and on an allowed page
    if (!refreshToken && LOGIN_PAGES.includes(path)) return

    // not logged in and on restricted page (server)
    if (!refreshToken && ctx.res) {
        ctx.res.writeHead(307, { Location: '/authorize' })
        ctx.res.end()
        return
    }

    // not logged in and on restricted page (client)
    if (!refreshToken) {
        Router.replace('/authorize')
        return
    }

    // logged in and on login page (server)
    if (refreshToken && LOGIN_PAGES.includes(path) && ctx.res) {
        ctx.res.writeHead(307, { Location: '/fyp' })
        ctx.res.end()
        return
    }

    // logged in and on login page (client)
    if (refreshToken && LOGIN_PAGES.includes(path)) {
        Router.replace('/fyp')
        return
    }

    // logged in and on restricted page
    return
}
