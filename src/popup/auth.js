import 'expose-loader?$!expose-loader?jQuery!jquery'

$(() => {
    let path = location.pathname
    if (path.includes('auth.html')) {
        auth()
    }
    else if (path.includes('access_token.html')) {
        token()
    }
})

function auth() {
    var clientId = chrome.runtime.getManifest().token
    var uri = encodeURIComponent(chrome.runtime.getURL('popup/access_token.html'))

    location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_params=client_id=${clientId}&redirect_uri=${uri}&response_type=token&force_verify=false`
}

function token() {
    var hash = location.hash.length > 0 ? location.hash.substring(1) : ''
    const ret = {}

    if (hash.length > 0) {
        var item = hash.split('&')
        for (var i in hash.split('&')) {
            if (item[i].includes('=')) {
                const data = item[i].split('=')
                const k = data[0]
                ret[k] = data[1]
            }
        }
    }

    chrome.storage.local.set({'access_token': ret.access_token})
    location.href(chrome.getURL('popup/popup.html'))
}