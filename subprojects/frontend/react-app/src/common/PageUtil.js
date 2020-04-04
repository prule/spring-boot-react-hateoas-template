import Routes from "../Routes"

export function navigate(history, path, callback) {
    console.log('navigate', path);
    if (path) {
        history.push(path.toString())
        if (callback) {
            callback()
        }
    } else {
        console.log('No path to navigate to')
    }
}

export function isActiveLink(url) {
    return window.location.href.indexOf(url) !== -1
}

export function copyOf(source) {
    return merge({}, source)
}

export function merge(target, source) {
    return Object.assign(target, source)
}

export function stopEvent(e) {
    // if (e.stopPropagation) {
    //     e.stopPropagation()
    // }
    if (e.preventDefault) {
        e.preventDefault()
    }
}

export function fn(fn, arg1, arg2, arg3, arg4) {
    return (e) => {
        stopEvent(e);
        if (fn) {
            fn(arg1, arg2, arg3, arg4)
        }
    }
}
