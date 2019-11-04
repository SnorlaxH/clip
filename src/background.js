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