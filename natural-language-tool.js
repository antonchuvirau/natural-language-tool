'use strict';

// PLUGINS
/*
    A simple jQuery modal (http://github.com/kylefox/jquery-modal)
    Version 0.9.1
*/
!function(o){"object"==typeof module&&"object"==typeof module.exports?o(require("jquery"),window,document):o(jQuery,window,document)}(function(o,t,i,e){var s=[],l=function(){return s.length?s[s.length-1]:null},n=function(){var o,t=!1;for(o=s.length-1;o>=0;o--)s[o].$blocker&&(s[o].$blocker.toggleClass("current",!t).toggleClass("behind",t),t=!0)};o.modal=function(t,i){var e,n;if(this.$body=o("body"),this.options=o.extend({},o.modal.defaults,i),this.options.doFade=!isNaN(parseInt(this.options.fadeDuration,10)),this.$blocker=null,this.options.closeExisting)for(;o.modal.isActive();)o.modal.close();if(s.push(this),t.is("a"))if(n=t.attr("href"),this.anchor=t,/^#/.test(n)){if(this.$elm=o(n),1!==this.$elm.length)return null;this.$body.append(this.$elm),this.open()}else this.$elm=o("<div>"),this.$body.append(this.$elm),e=function(o,t){t.elm.remove()},this.showSpinner(),t.trigger(o.modal.AJAX_SEND),o.get(n).done(function(i){if(o.modal.isActive()){t.trigger(o.modal.AJAX_SUCCESS);var s=l();s.$elm.empty().append(i).on(o.modal.CLOSE,e),s.hideSpinner(),s.open(),t.trigger(o.modal.AJAX_COMPLETE)}}).fail(function(){t.trigger(o.modal.AJAX_FAIL);var i=l();i.hideSpinner(),s.pop(),t.trigger(o.modal.AJAX_COMPLETE)});else this.$elm=t,this.anchor=t,this.$body.append(this.$elm),this.open()},o.modal.prototype={constructor:o.modal,open:function(){var t=this;this.block(),this.anchor.blur(),this.options.doFade?setTimeout(function(){t.show()},this.options.fadeDuration*this.options.fadeDelay):this.show(),o(i).off("keydown.modal").on("keydown.modal",function(o){var t=l();27===o.which&&t.options.escapeClose&&t.close()}),this.options.clickClose&&this.$blocker.click(function(t){t.target===this&&o.modal.close()})},close:function(){s.pop(),this.unblock(),this.hide(),o.modal.isActive()||o(i).off("keydown.modal")},block:function(){this.$elm.trigger(o.modal.BEFORE_BLOCK,[this._ctx()]),this.$body.css("overflow","hidden"),this.$blocker=o('<div class="'+this.options.blockerClass+' blocker current"></div>').appendTo(this.$body),n(),this.options.doFade&&this.$blocker.css("opacity",0).animate({opacity:1},this.options.fadeDuration),this.$elm.trigger(o.modal.BLOCK,[this._ctx()])},unblock:function(t){!t&&this.options.doFade?this.$blocker.fadeOut(this.options.fadeDuration,this.unblock.bind(this,!0)):(this.$blocker.children().appendTo(this.$body),this.$blocker.remove(),this.$blocker=null,n(),o.modal.isActive()||this.$body.css("overflow",""))},show:function(){this.$elm.trigger(o.modal.BEFORE_OPEN,[this._ctx()]),this.options.showClose&&(this.closeButton=o('<a href="#close-modal" rel="modal:close" class="close-modal '+this.options.closeClass+'">'+this.options.closeText+"</a>"),this.$elm.append(this.closeButton)),this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker),this.options.doFade?this.$elm.css({opacity:0,display:"inline-block"}).animate({opacity:1},this.options.fadeDuration):this.$elm.css("display","inline-block"),this.$elm.trigger(o.modal.OPEN,[this._ctx()])},hide:function(){this.$elm.trigger(o.modal.BEFORE_CLOSE,[this._ctx()]),this.closeButton&&this.closeButton.remove();var t=this;this.options.doFade?this.$elm.fadeOut(this.options.fadeDuration,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}):this.$elm.hide(0,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}),this.$elm.trigger(o.modal.CLOSE,[this._ctx()])},showSpinner:function(){this.options.showSpinner&&(this.spinner=this.spinner||o('<div class="'+this.options.modalClass+'-spinner"></div>').append(this.options.spinnerHtml),this.$body.append(this.spinner),this.spinner.show())},hideSpinner:function(){this.spinner&&this.spinner.remove()},_ctx:function(){return{elm:this.$elm,$elm:this.$elm,$blocker:this.$blocker,options:this.options}}},o.modal.close=function(t){if(o.modal.isActive()){t&&t.preventDefault();var i=l();return i.close(),i.$elm}},o.modal.isActive=function(){return s.length>0},o.modal.getCurrent=l,o.modal.defaults={closeExisting:!0,escapeClose:!0,clickClose:!0,closeText:"Close",closeClass:"",modalClass:"modal",blockerClass:"jquery-modal",spinnerHtml:'<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',showSpinner:!0,showClose:!0,fadeDuration:null,fadeDelay:1},o.modal.BEFORE_BLOCK="modal:before-block",o.modal.BLOCK="modal:block",o.modal.BEFORE_OPEN="modal:before-open",o.modal.OPEN="modal:open",o.modal.BEFORE_CLOSE="modal:before-close",o.modal.CLOSE="modal:close",o.modal.AFTER_CLOSE="modal:after-close",o.modal.AJAX_SEND="modal:ajax:send",o.modal.AJAX_SUCCESS="modal:ajax:success",o.modal.AJAX_FAIL="modal:ajax:fail",o.modal.AJAX_COMPLETE="modal:ajax:complete",o.fn.modal=function(t){return 1===this.length&&new o.modal(this,t),this},o(i).on("click.modal",'a[rel~="modal:close"]',o.modal.close),o(i).on("click.modal",'a[rel~="modal:open"]',function(t){t.preventDefault(),o(this).modal()})});

// FUNCTIONS
function onFormTextareaKeydownHandler(evt) {
    const keyCode = evt.code;

    if (keyCode === KEY_CODE_NAME) {
        if (checkFormSubject(formSubjectInput)) {
            changeFormStatus(true);
            // SENDING DATA TO THE SERVER
            const formResponse = getFormResponse(generateFormData());
            formResponse.then(resp => resp.json()).then(data => {
                changeFormStatus(false);
                parseFormResponse(data);
            }).catch(error => alert(error));
        }
    }
}
function isFormInputsEmpty() {
    let isValid = false
    // CHECK SUBJECT LINE
    if (!formSubjectInput.value) {
        formSubjectInput.classList.add(`b-form__input_empty`);
        isValid = false;
    }
    else {
        formSubjectInput.classList.remove(`b-form__input_empty`);
        isValid = true;
    }
    // CHECK CONTENT
    if (!formTextarea.textContent) {
        formTextarea.classList.add(`b-form__input_empty`);
        isValid = false;
    }
    else {
        formTextarea.classList.remove(`b-form__input_empty`);
        isValid = true;
    }
    return isValid;
}
function onFormSubmitHandler(evt) {
    evt.preventDefault();
    if (evt.type === `submit`) {
        if (isFormInputsEmpty()) {
            changeFormStatus(true);
            // SENDING DATA TO THE SERVER
            const formResponse = getFormResponse(generateFormData());
            formResponse.then(resp => resp.json()).then(data => {
                changeFormStatus(false);
                parseFormResponse(data);
            }).catch(error => alert(error));
        }
    }
}
function isLightBulbContent(lightBulbElement) {
    return lightBulbElement.querySelector(`.light-bulb__content`) ? true : false;
}
function renderLightBulbContent(lightBulbElement, indexOfARule) {
    const lightBulbContentTemplate = document.querySelector(`#light-bulb-content`).content;
    const lightBulbContentFragment = new DocumentFragment();
    const clonedLightBulbContentTemplate = lightBulbContentTemplate.cloneNode(true);
    // RENDER CONTENT
    clonedLightBulbContentTemplate.querySelector(`.light-bulb__header-button`).setAttribute(`data-rule-index`, indexOfARule);
    for (const exampleItem of nltResultsData.content['nlp_response'].messages[indexOfARule - 1][indexOfARule].examples) {
        const exampleContentTag = document.createElement(`li`);
        exampleContentTag.classList.add(`light-bulb__list-item`);
        exampleContentTag.textContent = exampleItem;
        clonedLightBulbContentTemplate.querySelector(`.light-bulb__list`).appendChild(exampleContentTag);
    }
    const messageContentTag = document.createElement(`li`);
    messageContentTag.classList.add(`light-bulb__list-item`);
    messageContentTag.textContent = nltResultsData.content['nlp_response'].messages[indexOfARule - 1][indexOfARule].message;
    clonedLightBulbContentTemplate.querySelector(`.light-bulb__list`).appendChild(messageContentTag);
    lightBulbContentFragment.appendChild(clonedLightBulbContentTemplate);
    lightBulbElement.appendChild(lightBulbContentFragment);
}
function onDocumentClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.light-bulb__icon`)) {
        if (!target.classList.contains(`light-bulb__icon_active`)) {
            if (!isLightBulbContent(target.closest(`.light-bulb`))) {
                const targetParentElement = target.closest(`.light-bulb`);
                const ruleIndex = targetParentElement.dataset.ruleIndex;
                disableLightBulbPopups();
                // RENDER LIGHT BULB'S CONTENT
                renderLightBulbContent(targetParentElement, ruleIndex);
                // DRY
                formTextarea.removeAttribute(`contenteditable`);
                target.classList.add(`light-bulb__icon_active`);
                target.nextElementSibling.classList.toggle(`light-bulb__content_active`);
                return;
            }
            disableLightBulbPopups();
            // DRY
            formTextarea.removeAttribute(`contenteditable`);
            target.classList.add(`light-bulb__icon_active`);
            target.nextElementSibling.classList.toggle(`light-bulb__content_active`);
            return;
        }
        // DRY
        disableLightBulbPopups();
        formTextarea.setAttribute(`contenteditable`, true);
        target.classList.remove(`light-bulb__icon_active`);
        target.nextElementSibling.classList.remove(`light-bulb__content_active`);
    }
    if (!target.closest(`.light-bulb`) && !target.closest(`.blocker`)) {
        const lightBulbElementCollection = document.querySelectorAll(`.light-bulb`);
        if (lightBulbElementCollection.length) {
            disableLightBulbPopups();
            formTextarea.setAttribute(`contenteditable`, true);
        }
    }
    if (target.matches(`.light-bulb__header-button`)) {
        const ruleIndex = target.dataset.ruleIndex;
        const ruleContent = nltResultsData['learn_rules'][ruleIndex];
        jQuery('#rule-description').modal();
        const ruleContentModal = document.querySelector(`.jquery-modal.current`).querySelector(`.modal__grid`);
        ruleContentModal.textContent = ruleContent;
    }
}
function generateFormData() {
    // CREATING FORM DATA OBJECT
    const formData = new FormData();
    formData.set(`action`, WORDPRESS_AJAX_ACTION_NAME);
    formData.set(`id`, getCookie(COOKIE_ID_NAME));
    // formData.set(`content`, parseFormContent());
    formData.set(`content`, `HELLO MS. Emma\nGood Afternoon\n\nI researched your website dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd and read all about your vision for Acme Apartment Complex.\nThe project looks fantastic, and I would love to observe and be part of the planning process.\n\nI\'m on the Big State University volleyball team, a peer mentor and also the president of my dorm.\n\nThanks so much, and I hope to hear from you.\n\nPh: 832-732-9526\nJane Doe\nMachanian in Google`);
    formData.set(`subject`, formSubjectInput.value);
    return formData;
}
function getFormResponse(formRequestData) {
    return fetch(AJAX_URL, {
        method: `POST`,
        credentials: `same-origin`,
        body: formRequestData
    });
}
function parseFormContent() {
    const formContent = formTextarea.innerHTML;
    const formContentChildNodes = formTextarea.childNodes;
    const modifiedFormContent = formContent.replaceAll(/<div>.+<\/div>/ig, (replacement) => {
        replacement = replacement.replaceAll(`<br>`, ``);
        replacement = replacement.replaceAll(`<div>`, `\n`);
        replacement = replacement.replaceAll(`</div>`, ``);
        return replacement;
    });
    return modifiedFormContent;
}
function changeFormStatus(isDisabled = false) {
    if (isDisabled) {
        formSubmitButton.textContent = `Sending...`;
        formSubmitButton.classList.add(`b-form__button_progress`);
        form.classList.add(`b-form_disabled`);
    }
    else {
        formSubmitButton.textContent = `Send`;
        formSubmitButton.classList.remove(`b-form__button_progress`);
        form.classList.remove(`b-form_disabled`);
    }
}
function getTimestamp() {
    const dateNow = new Date();
    return dateNow.getTime();
}
function renderLightBulbLayout(content) {
    content = content.replaceAll(REGEX_NEW_LINE_SYMBOL, `<br>`);
    return content.replaceAll(REGEX_NEW_LINE, (replacement) => {
        const result = replacement.replaceAll(REGEX_NLT_TAG, (innerItem) => {
            const replacementIndex = innerItem.match(/\d{1}/g);
            if (replacementIndex) {
                return `${getLightBulbHTMLTemplate(replacementIndex)}`;
            }
        });
        return `<div>${result}</div>`;
    });
}
function parseFormResponse(resultsData) {
    // MAKE RESULTS GLOBAL
    nltResultsData = resultsData;
    console.log(nltResultsData);
    document.execCommand(`selectAll`, false, null);
    document.execCommand(`delete`, false, null);
    document.execCommand(`insertHTML`, false, renderLightBulbLayout(resultsData.content.text));
}
function disableLightBulbPopups() {
    const lightBulbElementCollection = document.querySelectorAll(`.light-bulb`);
    for (const lightBulbElement of lightBulbElementCollection) {
        const lightBulbIconElement = lightBulbElement.querySelector(`.light-bulb__icon`);
        const lightBulbContentElement = lightBulbElement.querySelector(`.light-bulb__content`);
        lightBulbIconElement.classList.remove(`light-bulb__icon_active`);
        if (lightBulbContentElement) {
            lightBulbContentElement.classList.remove(`light-bulb__content_active`);
        }
    }

}
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
function deleteCookie(name) {
    setCookie(name, ``, {
        path: `/`,
        maxAge: -1
    });
}
function getLightBulbHTMLTemplate(indexOfARule) {
    return `<div data-rule-index="${indexOfARule}" class="light-bulb"><div class="light-bulb__icon">&nbsp;</div></div>`;
}

// VARIABLES
const AJAX_URL = `https://rubineducation.com/wp-admin/admin-ajax.php`;
const COOKIE_ID_NAME = `nlt-id`;
const KEY_CODE_NAME = `Enter`;
const WORDPRESS_AJAX_ACTION_NAME = `nlt`;
const REGEX_NEW_LINE = /.+\S/ig;
const REGEX_NLT_TAG = /<nlp>\d{1}<\/nlp>/g;
const REGEX_NEW_LINE_SYMBOL = /\n|\r/g;
const TEXT_NODE_TYPE_INDEX = 3;
const COOKIE_SETTINGS = {
    path: `/`,
    secure: true,
    maxAge: 3600,
    sameSite: `lax`
};

const form = document.querySelector(`.b-form__el`);
const formSubmitButton = document.querySelector(`.b-form__button`);
const formTextarea = document.querySelector(`.b-form__textarea`);
const formSubjectInput = document.querySelector(`.b-form__input[name="subject"]`);
let nltResultsData;

// EVENTS
document.addEventListener(`DOMContentLoaded`, () => {
    // CREATE COOKIE IF IT IS NOT EXIST
    const sessionCookie = getCookie(COOKIE_ID_NAME);
    if (!sessionCookie) {
        setCookie(COOKIE_ID_NAME, getTimestamp(), COOKIE_SETTINGS);
    }
    if (form) {
        document.addEventListener(`click`, onDocumentClickHandler);
        document.execCommand(`defaultParagraphSeparator`, false, `div`);
        document.execCommand(`styleWithCSS`, true);
        form.addEventListener(`submit`, onFormSubmitHandler);
        formTextarea.addEventListener('paste', (event) => {
            let paste = (event.clipboardData || window.clipboardData).getData('text');
            // paste = paste.toUpperCase();
        
            const selection = window.getSelection();
            if (!selection.rangeCount) return false;
            selection.deleteFromDocument();
            selection.getRangeAt(0).insertNode(document.createTextNode(paste));
        
            event.preventDefault();
        });
        // formTextarea.addEventListener(`keydown`, onFormTextareaKeydownHandler);
    }
});
// DELETE COOKIA WHEN CLOSING A TAB
window.addEventListener(`unload`, () => {
    deleteCookie(COOKIE_ID_NAME);
});