'use strict';

// FUNCTIONS
function onFormTextareaKeydownHandler(evt) {
    const keyCode = evt.code;

    if (keyCode === `Enter`) {
        changeFormStatus(true);
        const formTextareaTextContent = formTextarea.value;
        const formSubject = document.querySelector(`input[name="subject"]`).value;
        const formData = new FormData();
        formData.set(`action`, `nlt`);
        formData.set(`content`, formTextareaTextContent);
        formData.set(`subject`, formSubject);
        // SENDING DATA TO THE SERVER
        const response = getResponse(formData);
        response.then(resp => resp.json()).then(data => {
            changeFormStatus(false);
            document.querySelector(`.dev-help-box span[data-value="title"]`).textContent = `Title: ${data.title}`;
            document.querySelector(`.dev-help-box span[data-value="message"]`).textContent = `Message: ${data.message}`;
            document.querySelector(`.dev-help-box span[data-value="result"]`).textContent = `Result: ${data.result}`;
        }).catch(error => console.log(error))
    }
}

function getResponse(requestData) {
    return fetch(AJAX_URL, {
        method: `POST`,
        credentials: `same-origin`,
        body: requestData
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

function getLocalStorageNtlId(localStorageNtlIdName) {
    return localStorage.getItem(`localStorageNtlIdName`);
}

function setLocalStorageNtlId(localStorageNtlIdName, localStorageNtlIdValue) {
    localStorage.setItem(localStorageNtlIdName, localStorageNtlIdValue);
}

function generateTimestamp() {
    const dateNow = new Date();
    return dateNow.getTime();
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
const LOCAL_STORAGE_NTL_ID_NAME = `ntl-id`;

const form = document.querySelector(`.dev-form`);
const formSubmitButton = document.querySelector(`.dev-form__button`);
const formTextarea = document.querySelector(`.dev-form__textarea`);

// EVENTS
document.addEventListener(`DOMContentLoaded`, () => {
    if (formTextarea) {
        formTextarea.addEventListener(`keydown`, onFormTextareaKeydownHandler);
    }
    // LOCAL STORAGE DATA
    const localStorageNtlId = getLocalStorageNtlId(LOCAL_STORAGE_NTL_ID_NAME);
    if (!localStorageNtlId) {
        // CREATING LOCAL STORAGE NTL ID
        setLocalStorageNtlId(LOCAL_STORAGE_NTL_ID_NAME, generateTimestamp());
    }
});