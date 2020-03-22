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

export function onApiError(apiError) {
    console.log(apiError)
    switch (apiError.status) {
        case 403:
            this.navigate(Routes.main.login())
            break
        case "BAD_REQUEST":
            this.setState({
                errorMessage: "A validation error has occurred.",
                apiError: apiError
            })
            break
        case "NOT_FOUND":
            this.setState({
                errorMessage: "Could not find object.",
                apiError: apiError
            })
            break
        case "UNAUTHORIZED":
            this.setState({
                errorMessage: "Invalid credentials.",
                apiError: apiError
            })
            break
        default:
            this.setState({
                errorMessage: "An unknown error has occurred. Please try again later."
            })
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

// export function onChange(event) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;
//
//     // construct a map from the dotted path of the given name so we can set the state of the nested object
//
//     const nameParts = name.split('.');
//     const obj = this.state[nameParts[0]];
//
//     let subObj = obj
//     for (let i = 1; i < nameParts.length - 1; i++) {
//         subObj = subObj[nameParts[i]]
//     }
//     subObj[nameParts[nameParts.length - 1]] = value;
//
//     const state = {};
//     state[nameParts[0]] = obj;
//     this.setState(state);
// }
//

export function fn(fn, arg1, arg2, arg3, arg4) {
    return (e) => {
        stopEvent(e);
        if (fn) {
            fn(arg1, arg2, arg3, arg4)
        }
    }
}
