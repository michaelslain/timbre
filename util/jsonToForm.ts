const jsonToForm = (json: any): string => {
    const data = new URLSearchParams()

    Object.entries(json).forEach(entry => {
        const [key, value]: [any, any] = entry
        data.append(key, value)
    })

    return data.toString()
}

export default jsonToForm
