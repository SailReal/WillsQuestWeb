export const $ = (className: string, root?: Element | Document): NodeListOf<Element> | HTMLCollectionOf<Element> => {
    // we can decide if we want to use ..ByClassName or ..ById
    // by checking the first character of the parameter
    if (!root) {
        root = document;
    }
    return root.getElementsByClassName(className);
};

export const addClickHandler = (elem: HTMLElement, handler: EventListener | EventListenerObject) => {
    elem.addEventListener('click', handler);
};

export const addClickHandlerToClass = (className: string, handler: EventListener | EventListenerObject) => {
    const elems = $(className);
    for (let i = 0; i < elems.length; ++i) {
        elems.item(i).addEventListener('click', handler);
    }
};

export const replaceVueWithDiv = () => {
    const newElem: HTMLElement = document.createElement('div');
    newElem.id = 'vue-component';
    const rootElem = document.getElementById('root');
    if (rootElem) {
        if (rootElem.hasChildNodes()) {
            rootElem.removeChild(rootElem.lastChild!);
        }
        rootElem.appendChild(newElem);
    }
};

export const doFetch = async (url: string, fetchMethod: string) => {
    if (fetchMethod.toUpperCase() === 'POST') {
        return doFetchPost(url);
    }

    return doFetchGet(url);
};

const doFetchGet = async (url: string) => {
    return await fetch(url, {
        credentials: 'include',
        headers: {
            'contentType': 'application/json'
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
