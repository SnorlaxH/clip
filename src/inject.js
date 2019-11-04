import $ from "jquery"
const utils = require('./utils').default

const DL_ICO = '<div class="tw-aspect__spacer" style="padding-bottom: 100%;"></div><svg class="tw-icon__svg" style="width:{SIZE}px;height:{SIZE}px;" viewBox="0 0 {SIZE} {SIZE}"><path fill="#{COLOR}" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg>'
const DL_ICO2 = '<div class="tw-aspect__spacer" style="padding-bottom: 100%;"></div><svg class="tw-icon__svg" style="width:{SIZE}px;height:{SIZE}px;" viewBox="0 0 20 15"><path fill="#{COLOR}" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg>'
const dlBtn = $('<button class="player-button qa-dl-button pl-mg-r-1" tabindex="-1" type="button"><span><span class="player-tip" data-tip="다운로드"></span><span class="qa-svg"></span></span></button>')
const dlBtnList = $('<button class="tw-button tw-button--dropmenu tw-button--hollow tw-interactive" data-test-selector="button-text" data-a-target="video-type-filter-dropdown"><span class="tw-button__text" data-a-target="tw-button-text">다운로드</span><span class="tw-button__icon tw-button__icon--right"><div style="width: 2rem; height: 2rem;"> <div class="tw-align-items-center tw-full-width tw-icon tw-icon--fill tw-inline-flex"><div class="tw-aspect tw-aspect--align-top tw-svg"></div></div></div></span></button>')

const draw = (isList) => {
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
            dlBtn.find('.qa-svg').empty().append(utils.reAll(utils.reAll(DL_ICO, '{SIZE}', 30), '{COLOR', 'FFFFFF'))
            dlBtn.css('margin-top', '3px').css('margin-left', '-10px').css('height', '31px')
            $('.player-buttons-right').append(dlBtn)

    }
    else {
            dlBtnList.find('.tw-svg').empty().append(utils.reAll(utils.reAll(DL_ICO2, '{SIZE}', 15), '{COLOR}', 'FFFFFF'))
            dlBtnList.find('.tw-svg').css('margin-top', '-6px')
            $('.preview-card').append(dlBtnList)

    }
}

window.onload = () => {
    let target = null;
    const mode = utils.getMode()

    if (mode == utils.MODE_SINGLE || mode == utils.MODE_SINGLE_WITH_LIST) {
        draw(0)
    }
    if (mode == utils.MODE_LIST || mode == utils.MODE_SINGLE_WITH_LIST) {
        draw(1)
    }

    const invl = setInterval(() => {
        if(target !== null && target.length > 0) {
            clearInterval(invl)
            draw(1)
        }
        target = document.querySelectorAll('.preview-card')
    }, 100);
}