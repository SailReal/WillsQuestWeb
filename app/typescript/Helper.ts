export const getElemByClassName = (className: string): HTMLCollectionOf<Element> => {
    // we can decide if we want to use ..ByClassName or ..ById
    // by checking the first character of the parameter
    return document.getElementsByClassName(className)
}
//FIXME get source maps working
