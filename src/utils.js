/**
 * utils function(s) module
 */
import $ from "jquery"

const MODE_SINGLE = 1
const MODE_SINGLE_WITH_LIST = 2
const MODE_LIST = 3

const getMode = () => {
    const host = window.location.hostname
    const path = window.location.pathname
    let mode = -1;
    // clip single
    if (host.includes('clips.twitch.tv')) {
        mode = MODE_SINGLE
    }
    else {
        // clip list
        if (path.includes('/clips')) {
            mode = MODE_LIST
        }
        // clip single with list
        else if (path.includes('/clip')) {
            mode = MODE_SINGLE_WITH_LIST
        }
    }

    return mode
}

const getTitle = (obj) => {
    const mode = getMode()
    let title;
    
    if(mode) {
        if (mode == MODE_SINGLE) {
            title = $('.clips-sidebar .clips-chat-title span.tw-ellipsis').attr('title')
        }
        else if (mode == MODE_SINGLE_WITH_LIST) {
            // player
            if ($(obj).parent().hasClass('player-buttons-right')) {
                title = $('.channel-root__player-container span.tw-ellipsis').attr('title')
            }
            // bottom list
            else {
                title = $(obj).closest('.preview-card').find('.preview-card__titles-wrapper h3.tw-ellipsis').attr('title')
            }
        }
        else if (mode == MODE_LIST) {
            title = $(obj).closest('.preview-card').find('.preview-card__titles-wrapper h3.tw-ellipsis').attr('title')
        }
    }

    return title || ''
}
const getUrl = (obj) => {
    const mode = getMode()
    const player = $('.player-video')
    let url = '';

    if(mode) {
        if (mode == MODE_SINGLE) {
            url = player.find('video').attr('src')
        }
        else if (mode == MODE_SINGLE_WITH_LIST) {
            // player
            if ($(obj).parent().hasClass('player-buttons-right')) {
                url = player.find('video').attr('src')
            }
            // bottom list
            else {
                let src = $(obj).closest('.preview-card').find('img.tw-image').attr('src').split('/')
                let img = src[src.length - 1]

                url = 'https://clips-media-assets2.twitch.tv/{0}.mp4'.replace('{0}', img.substring(0, img.indexOf('-preview')))
            }
        }
        else if (mode == MODE_LIST) {
            let src = $(obj).closest('.preview-card').find('img.tw-image').attr('src').split('/')
            let img = src[src.length - 1]

            url = 'https://clips-media-assets2.twitch.tv/{0}.mp4'.replace('{0}', img.substring(0, img.indexOf('-preview')))
        }
    }
    return url;
}
const reAll = (s, o, n) => {
    return s.split(o).join(n)
}


const utils = {
    MODE_SINGLE,
    MODE_SINGLE_WITH_LIST,
    MODE_LIST,
    dl: (obj) => {
        const url = getUrl(obj)
        const title = getTitle(obj)

        chrome.runtime.sendMessage({
            url,
            title,
        })
    },
    getMode,
    reAll,
}

String.prototype.fmt = () => {
    var args = arguments
    var mth = /{[\d]+}/g
    var ret = this
    console.log(ret)
    for(var i = 0 ; i < mth.length; i++) {
        ret = ret.replace(mth[i], args[i])
    }
    return ret
}

export default utils