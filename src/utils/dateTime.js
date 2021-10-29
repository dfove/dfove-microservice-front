function f (n) {
    return Number(n) < 10 ? `0${n}` : n
}
export function dataTime (data = 'dateTime', v = '-') {
    let date = new Date()

    const year = date.getFullYear()
    const month = f(date.getMonth() + 1)
    const day = f(date.getDate())

    const h = f(date.getHours())
    const m = f(date.getMinutes())
    const s = f(date.getSeconds())

    switch (data) {
        case 'dateTime':
            return `${year}${v}${month}${v}${day} ${h}:${m}:${s}`
            break
        case 'date':
            return `${year}${v}${month}${v}${day}`
            break
        case 'date':
            return `${h}:${m}:${s}`
            break
    }
}

function formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime2 (timestamp) {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month].map(formatNumber).join('-')

    return `${t1}`
}

export function formatTime3 (timestamp) {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const t1 = [year, month].map(formatNumber).join('-')

    return `${t1}`
}

function getDate (datestr) {
    var temp = datestr.split('-')
    var date = new Date(temp[0], temp[1], temp[2])
    return date
}
