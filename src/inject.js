import $ from "jquery"
const utils = require('./utils').default

const DL_ICO = '<svg class="tw-icon__svg" style="width:20px;height:20px;" viewBox="0 0 {SIZE} {SIZE}"><g><polygon fill="#{COLOR}" points="17.1,8.7 15.1,6.6 12.8,9.2 12.8,2.3 10.2,2.3 10.2,9.2 7.6,6.7 5.9,8.4 11.5,14.6"/><path fill="#{COLOR}" d="M2.3,14.6h2.6v3.5l13.1,0v-3.5l2.6,0V19c0,0-0.2,1.8-1.8,1.8c-1.6,0-14.9,0-14.9,0S2.3,20.6,2.3,19 C2.3,17.4,2.3,14.6,2.3,14.6z"/></g></svg>'
const DL_ICO2 = '<div class="tw-aspect__spacer" style="padding-bottom: 100%;"></div><svg class="tw-icon__svg" style="width:{SIZE}px;height:{SIZE}px;" viewBox="0 0 23 23"><g><polygon fill="#{COLOR}" points="17.1,8.7 15.1,6.6 12.8,9.2 12.8,2.3 10.2,2.3 10.2,9.2 7.6,6.7 5.9,8.4 11.5,14.6"/><path fill="#{COLOR}" d="M2.3,14.6h2.6v3.5l13.1,0v-3.5l2.6,0V19c0,0-0.2,1.8-1.8,1.8c-1.6,0-14.9,0-14.9,0S2.3,20.6,2.3,19 C2.3,17.4,2.3,14.6,2.3,14.6z"/></g></svg>'
const DL_EL = '<div class="tw-relative"><div data-test-selector="toggle-balloon-wrapper__mouse-enter-detector" style="display: inherit;"><div class="tw-inline-flex tw-relative tw-tooltip-wrapper"> <button class="tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-button-icon tw-button-icon--secondary tw-core-button tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative" aria-label="{TITLE}"><span class="tw-button-icon__icon"> <div style="width: 2rem; height: 2rem;"> <div class="tw-align-items-center tw-full-width tw-icon tw-icon--fill tw-inline-flex"> <div class="tw-aspect tw-aspect--align-top"> <div class="tw-aspect__spacer" style="padding-bottom: 100%;"></div><span class="qa-svg"></span> </div></div></div></span></button> <div class="tw-tooltip tw-tooltip--align-center tw-tooltip--down" data-a-target="tw-tooltip-label" role="tooltip">{TITLE}</div></div></div></div>'.reAll('{TITLE}', '다운로드')
const DL_EL2 = '<button class="tw-button tw-button--dropmenu tw-button--hollow tw-interactive clip-dl-button" data-test-selector="button-text" data-a-target="video-type-filter-dropdown" style="margin-top: 10px;"><span class="tw-button__text" data-a-target="tw-button-text">{TITLE}</span><span class="tw-button__icon tw-button__icon--right"><div style="width: 2rem; height: 2rem;"> <div class="tw-align-items-center tw-full-width tw-icon tw-icon--fill tw-inline-flex"><div class="tw-aspect tw-aspect--align-top tw-svg"></div></div></div></span></button>'.reAll('{TITLE}', '다운로드')
const dlBtn = $(DL_EL)
const dlBtnList = $(DL_EL2)

const draw = (isList) => {
    dlBtn.find('.qa-svg').empty().append(DL_ICO.reAll('{SIZE}', 23).reAll('{COLOR}', 'FFFFFF'))
    dlBtnList.find('.tw-svg').empty().append(DL_ICO2.reAll('{SIZE}', 15).reAll('{COLOR}', 'FFFFFF'))
    dlBtn.off().click((e) => {
        e.preventDefault()
        console.log(e.currentTarget);
        utils.dl(e.currentTarget)
    })

    dlBtnList.off().click((e) => {
        e.preventDefault()
        console.log(e.currentTarget);
        utils.dl(e.currentTarget)
    })
    if (!isList) {
        $('.player-controls__right-control-group').prepend(dlBtn)
    } else {
        $('.clip-dl-button').remove()
        $('.preview-card').append(dlBtnList)
    }
}

function init() {
    const mode = utils.getMode()

    if (mode == utils.MODE_SINGLE || mode == utils.MODE_SINGLE_WITH_LIST) {
        draw(false)
    }
    if (mode == utils.MODE_LIST || mode == utils.MODE_SINGLE_WITH_LIST) {
        draw(true)
    }

    const invl = setInterval(() => {
            const mode = utils.getMode()
            const target = $('.preview-card')
            if (mode == utils.MODE_LIST || mode == utils.MODE_SINGLE_WITH_LIST) {
                console.log(target.length, $('.clip-dl-button').length)
                if (target.length != $('.clip-dl-button').length) {
                    draw(true)
                }
            }

        },
        1000);
}

chrome.extension.onMessage.addListener((req, sender, res) => {
    if (req.type === 'initClips') {
        init();
    }
})