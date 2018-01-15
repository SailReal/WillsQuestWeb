import * as $ from 'jquery';

export const addClickHandler = (elem: HTMLElement, handler: EventListener | EventListenerObject) => {
    elem.addEventListener('click', handler);
};

export const addClickHandlerToClass = (className: string, handler: EventListener | EventListenerObject) => {
    const elems = $(className);
    for (let i = 0; i < elems.length; ++i) {
        elems.get(i).addEventListener('click', handler);
    }
};

export const replaceVueWithDiv = () => {
    const rootElem = $('#root');
    if (rootElem) {
        if (rootElem.children().length > 0) {

            rootElem.children().last().remove();
        }
        rootElem.append('<div id="vue-component"></div>');
    }
};

export const doFetch = (url: string, fetchMethod: string) => {
    if (fetchMethod.toUpperCase() === 'POST') {
        return doFetchPost(url);
    }

    return doFetchGet(url);
};

const doFetchGet = async (url: string) => {
    return await $.get(url, {
        headers: {
            'contentType': 'application/json'
        },
        xhrFields: {
            withCredentials: true
        }
    });
};

const doFetchPost = async (url:string) => {
    const csrfElem = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = (csrfElem && csrfElem.getAttribute("content")) || '';

    return await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'contentType': 'application/json',
            'Csrf-Token': csrfToken.toString()
        }
    });
};
