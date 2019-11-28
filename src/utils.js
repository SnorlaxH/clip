/**
 * utils function(s) module
 */
import $ from "jquery"

String.prototype.reAll = function (o, n) {
    return this.split(o).join(n);
}

String.prototype.fmt = function () {
    var ret = this;

    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + (i) + "\\}", "gm");
        ret = ret.replace(reg, arguments[i]);
    }
    return ret;
}

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

    if (mode) {
        if (mode == MODE_SINGLE) {
            title = $('.tw-line-height-heading').text()
        }
        else if (mode == MODE_SINGLE_WITH_LIST) {
            // player
            if (!$(obj).hasClass('clip-dl-button')) {
                title = $('.tw-card p.tw-strong span').attr('title')
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
    let url = '';

    if (mode) {
        if (mode == MODE_SINGLE) {
            url = $('video').attr('src')
        }
        else if (mode == MODE_SINGLE_WITH_LIST) {
            // player
            if (!$(obj).hasClass('clip-dl-button')) {
                url = $('video').attr('src')
            }
            // bottom list
            else {
                let src = $(obj).closest('.preview-card').find('img.tw-image').attr('src').split('/')
                let img = src[src.length - 1]

                url = 'https://clips-media-assets2.twitch.tv/{0}.mp4'.fmt(img.substring(0, img.indexOf('-preview')))
            }
        }
        else if (mode == MODE_LIST) {
            let src = $(obj).closest('.preview-card').find('img.tw-image').attr('src').split('/')
            let img = src[src.length - 1]

            url = 'https://clips-media-assets2.twitch.tv/{0}.mp4'.fmt(img.substring(0, img.indexOf('-preview')))
        }
    }
    return url;
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
}

export default utils