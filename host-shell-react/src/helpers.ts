export const listenForAuthenticationRequest = () => {
    window.addEventListener("message", event => {
        if (event.data.topic === 'MFE_FIRMWARE_REQUEST_AUTH_FROM_HOST') {
        }
    })
}

export const dispatchAuthenticationTokenToListener = (token: string) => {
    if (token) {
        window.postMessage({topic: "MFE_FIRMWARE_TABLE_AUTH_REQUEST", token: token})
    }
}