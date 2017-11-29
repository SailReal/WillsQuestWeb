import {addClickHandlerToClass} from './Helper'

const backButtonClickHandler = () => {
    window.history.back()
}

const addAllHandlers = () => {
    addClickHandlerToClass('back-button', backButtonClickHandler)
}

addAllHandlers()
