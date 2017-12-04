export const $ = (className: string, root?: Element | Document): NodeListOf<Element> | HTMLCollectionOf<Element> => {
    // we can decide if we want to use ..ByClassName or ..ById
    // by checking the first character of the parameter
    if (!root) {
        root = document
    }
    return root.getElementsByClassName(className)
}

export const addClickHandler = (elem: HTMLElement, handler: EventListener | EventListenerObject) => {
    elem.addEventListener('click', handler)
}

export const addClickHandlerToClass = (className: string, handler: EventListener | EventListenerObject) => {
    const elems = $(className)
    for (let i = 0; i < elems.length; ++i) {
        elems.item(i).addEventListener('click', handler)
    }
}
