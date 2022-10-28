import clientCookies from 'js-cookie'
import serverCookies from 'cookies'
import isServer from './isServer'

export const createServerCookiesObj = (ctx: any): serverCookies =>
    new serverCookies(ctx.req, ctx.res)

export const get = (key: string, ctx: any): string | undefined | null => {
    if (!isServer()) return clientCookies.get(key)
    return createServerCookiesObj(ctx).get(key)
}

export const set = (
    key: string,
    value: string,
    ctx: any,
    expiresIn: Date | null
): void => {
    if (!isServer() && !expiresIn) {
        clientCookies.set(key, value)
        return
    }
    if (!isServer() && expiresIn) {
        clientCookies.set(key, value, { expires: expiresIn })
        return
    }

    const obj = createServerCookiesObj(ctx)
    if (!expiresIn) {
        obj.set(key, value)
        return
    }

    obj.set(key, value, { expires: expiresIn })
}

export const del = (key: string, ctx: any): void => {
    if (!isServer()) {
        clientCookies.set(key, '', { expires: new Date() })
        return
    }
    createServerCookiesObj(ctx).set(key)
}
