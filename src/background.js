const utils = require('./utils')

chrome.runtime.onMessage.addListener((args) => {
    try {
        chrome.downloads.download({
            "url": args.url,
            "filename": args.title + ".mp4",
            "saveAs": false
        })
    }
    catch (e) {

    }
})

chrome.tabs.onUpdated.addListener((id, info, tab) => {
    if (info.status === 'complete' && tab.status === 'complete') {
        chrome.tabs.sendMessage(id, { type: 'initClips', url: info.url !== undefined })
    }
})