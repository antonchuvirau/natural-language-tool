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
            const formResponse = getFormResponse(getFormData());
            formResponse.then(resp => resp.json()).then(data => {
                changeFormStatus(false);
                parseFormResponse(data);
            }).catch(error => alert(error));
        }
    }
}

function checkFormSubject(subjectInput) {
    if (!subjectInput.value) {
        subjectInput.classList.add(`dev-form__input_empty`);
        return;
    }
    subjectInput.classList.remove(`dev-form__input_empty`);
    return true;
}

function onFormSubmitHandler(evt) {
    evt.preventDefault();
    changeFormStatus(true);
    // SENDING DATA TO THE SERVER
    const formResponse = getFormResponse(getFormData());
    formResponse.then(resp => resp.json()).then(data => {
        changeFormStatus(false);
        parseFormResponse(data);
    }).catch(error => alert(error));
}

function onDocumentClickHandler(evt) {
    const target = evt.target;

    if (target.matches(`.light-bulb__icon`)) {
        if (!target.classList.contains(`light-bulb__icon_active`)) {
            disableLightBulbPopups();
            formTextarea.removeAttribute(`contenteditable`);
            target.classList.add(`light-bulb__icon_active`);
            target.nextElementSibling.classList.toggle(`light-bulb__content_active`);
            return;
        }
        formTextarea.setAttribute(`contenteditable`, true);
        target.classList.remove(`light-bulb__icon_active`);
        target.nextElementSibling.classList.remove(`light-bulb__content_active`);
    }
    if (!target.closest(`.light-bulb`)) {
        const lightBulbElementCollection = document.querySelectorAll(`.light-bulb`);
        if (lightBulbElementCollection.length) {
            disableLightBulbPopups();
            formTextarea.setAttribute(`contenteditable`, true);
        }
    }
}

function getFormData() {
    // CREATING FORM DATA OBJECT
    const formData = new FormData();
    formData.set(`action`, WORDPRESS_AJAX_ACTION_NAME);
    formData.set(`id`, getLocalStorageNltId(LOCAL_STORAGE_NLT_ID_NAME));
    formData.set(`content`, formTextarea.textContent);
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

function changeFormStatus(isDisabled = false) {
    if (isDisabled) {
        formSubmitButton.textContent = `Sending...`;
        formSubmitButton.classList.add(`dev-form__button_progress`);
        form.classList.add(`dev-form_disabled`);
    }
    else {
        formSubmitButton.textContent = `Send`;
        formSubmitButton.classList.remove(`dev-form__button_progress`);
        form.classList.remove(`dev-form_disabled`);
    }
}

function getLocalStorageNltId(localStorageNltIdName) {
    return localStorage.getItem(localStorageNltIdName);
}

function setLocalStorageNltId(localStorageNltIdName, localStorageNltIdValue) {
    localStorage.setItem(localStorageNltIdName, localStorageNltIdValue);
}

function generateTimestamp() {
    const dateNow = new Date();
    return dateNow.getTime();
}

function parseFormResponse(resultsData) {
    const isValid = resultsData.result;

    if (!isValid) {
        document.execCommand(`selectAll`, false, null);
        document.execCommand(`delete`, false, null);
        document.execCommand(`insertHTML`, false, `<div>${resultsData.body}<div class="light-bulb"><div class="light-bulb__icon"></div><div class="light-bulb__content"><div class="light-bulb__header"><p class="light-bulb__header-title">Suggestions</p><button class="light-bulb__header-button" data-rule-index="0" data-modal="#description" type="button">Learn the rule</button></div><ul class="light-bulb__list"><li class="light-bulb__list-item">${resultsData.message}</li></ul></div></div></div>`);
    }
}

function disableLightBulbPopups() {
    const lightBulbElementCollection = document.querySelectorAll(`.light-bulb`);
    for (const lightBulbElement of lightBulbElementCollection) {
        lightBulbElement.querySelector(`.light-bulb__icon`).classList.remove(`light-bulb__icon_active`);
        lightBulbElement.querySelector(`.light-bulb__content`).classList.remove(`light-bulb__content_active`);
    }

}

// VARIABLES
const AJAX_URL = `https://rubineducation.com/wp-admin/admin-ajax.php`;
const RULES = [
    {
        title: `Rule 1: Address the person appropriately`,
        description: `If you don't yet know the email recipient or the person is senior (older and more experienced) in the field, you should use a proper title like Mr., Ms., Dr. or Prof.`,
        attention: `Do not use Mrs. for a woman unless you know she prefers to be addressed that way.`,
        examples: {
            title: `Examples:`,
            list: [`Hi Mr. Smith,`, `Hi Ms. Jones,`, `Hi Dr. Wilson,`, `Hi Prof. Chavez,`],
            additional: {
                title: `Finally, if the person identifies as nonbinary, you can use:`,
                list: [`To whom it may concern,`, `Hi there,`]
            }
        }
    },
    {
        title: `Rule 2: Provide a greeting`,
        description: `It’s customary to add a greeting to the start of your email. The greeting also allows you to provide an introduction before you begin the heart of your message.`,
        examples: {
            title: `Examples:`,
            list: [`Good morning.`, `Good afternoon.`]
        }
    },
    {
        title: `Rule 3: Show you did your research on the company / organization`,
        description: `The best outreach emails provide specific evidence that you have learned about the company. Visit the company’s website and read a recent piece of news (ex: pages like Newsroom, Blog or Press).`,
        examples: {
            title: `Then provide an example using the model below:`,
            list: [`I’m interested in <b>[particular field; for instance, “urban planning”]</b> and hope to gain skills and real-world experience with your team.`, `<b>Give one sentence on why you like what the company does. 
            For instance</b>, I researched your website and read all about your vision for Acme Apartment Complex. The project looks fantastic, and I would love to observe and be part of the planning process.`]
        },
        key: `The key is the use of “Acme Apartment Complex.” The specific language shows you visited the website and learned about the company.`
    },
    {
        title: `Rule 4: Provide detailed information about you`,
        description: `Give the employer a few details that help you show the kind of person you are.`,
        examples: {
            title: `For example:`,
            list: [`<b>Provide two to three more details that make you look appealing. For instance,</b> A bit more about me: “I’m on the Big State University volleyball team, a peer mentor and also the president of my dorm”.`, `I’m a hard worker, dependable and happy to help <b>[name of company/organization]</b> any way I can as an intern.`]
        }
    },
    {
        title: `Rule 5: Use a strong closing line`,
        description: `You want the line to suggest you appreciate the person’s time and want the person to take you seriously for the internship.`,
        examples: {
            title: `Example:`,
            list: [`Thanks so much, and I hope to hear from you.`]
        }
    },
    {
        title: `Rule 6: Subject line must be specific`,
        description: `The subject line should include key words like your name, the company and the opportunity you want to pursue.`,
        examples: {
            title: `Example:`,
            list: [`Jane Doe, interested in Acme Corporation internship`]
        }
    },
    {
        title: `Rule 7: Avoid large, blocky paragraphs`,
        description: `It’s hard for the email recipient to follow your message when it’s one big paragraph with no line breaks.`,
        content: [`<b>As a rule, start a new section after every 1-2 sentences. That means add a line break.</b>`, `Then write your next line (as demonstrated here).`]
    }
];
const LOCAL_STORAGE_NLT_ID_NAME = `nlt-id`;
const KEY_CODE_NAME = `Enter`;
const WORDPRESS_AJAX_ACTION_NAME = `nlt`;

const form = document.querySelector(`.dev-form`);
const formSubmitButton = document.querySelector(`.dev-form__button`);
const formTextarea = document.querySelector(`.dev-form__textarea`);
const formSubjectInput = document.querySelector(`input[name="subject"]`);

// EVENTS
document.addEventListener(`DOMContentLoaded`, () => {
    // LOCAL STORAGE DATA
    if (!getLocalStorageNltId(LOCAL_STORAGE_NLT_ID_NAME)) {
        // CREATING LOCAL STORAGE NTL ID
        setLocalStorageNltId(LOCAL_STORAGE_NLT_ID_NAME, generateTimestamp());
    }
    if (form) {
        document.addEventListener(`click`, onDocumentClickHandler);
        document.execCommand("defaultParagraphSeparator", false, "p");
        form.addEventListener(`submit`, onFormSubmitHandler);
        formTextarea.addEventListener(`keydown`, onFormTextareaKeydownHandler);
    }
});

// JQUERY
jQuery(document).ready(function() {
    jQuery(function() {
        jQuery('[data-modal]').on('click', function() {
          jQuery(jQuery(this).data('modal')).modal();
          return false;
        });
      });
});