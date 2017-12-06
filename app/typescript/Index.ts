import {$, addClickHandler, addClickHandlerToClass} from './Helper'

const constructPseudoNameRow = (plusHidden: boolean): HTMLElement => {
    const plusButton = document.createElement('button')
    plusButton.textContent = 'Plus'
    plusButton.classList.add('plus-button')
    if (plusHidden) {
        plusButton.classList.add('hidden')
    }
    addClickHandler(plusButton, plusButtonClickHandler)

    const minusButton = document.createElement('button')
    minusButton.textContent = 'Minus'
    minusButton.classList.add('minus-button')
    addClickHandler(minusButton, minusButtonClickHandler)

    const input = document.createElement('input')
    const inputType = document.createAttribute('type')
    inputType.value = 'text'
    input.attributes.setNamedItem(inputType)

    const nameRow = document.createElement('div')
    nameRow.classList.add('pseudo-name-row')
    nameRow.appendChild(input)
    nameRow.appendChild(plusButton)
    nameRow.appendChild(minusButton)

    return nameRow
}

const helpButtonClickHandler = () => {
    window.location.href = '/help'
}

const plusButtonClickHandler = (ev: MouseEvent) => {
    if (ev.srcElement && ev.srcElement.parentElement) {
        const parentElem = ev.srcElement.parentElement

        parentElem.classList.remove('pseudo-name-row')
        parentElem.classList.add('name-row')

        // FIXME test if elements not null instead of using '!'
        // check if current input has a value
        const inputElem = parentElem.getElementsByTagName('input').item(0) // there should only ever exist one child input
        if (inputElem.value.length === 0) {
            inputElem.value = 'Default' //FIXME get next default player name from controller -> Rest-API map url to controller method
        }
        const playerCount = parentElem.parentElement!.childElementCount.valueOf()
        const maxPlayer = 4 //FIXME get from controller -> Rest-API map url to controller method
        parentElem.parentElement!.appendChild(constructPseudoNameRow(playerCount === maxPlayer - 1))
    } else {
        //FIXME logging
    }
}

const minusButtonClickHandler = (ev: MouseEvent) => {
    if (ev.srcElement && ev.srcElement.parentElement) {
        const parentElem = ev.srcElement.parentElement

        const children = parentElem.parentElement!.children
        $('.plus-button', children.item(children.length - 1)).item(0)
        const plusButtonLastChild = $('plus-button', children.item(children.length - 1)).item(0) // there should only ever exist one plus button
        plusButtonLastChild.classList.remove('hidden')

        // FIXME test if elements not null instead of using '!'
        parentElem.parentElement!.removeChild(parentElem)
    } else {
        //FIXME logging
    }
}


const addAllHandlers = () => {
    addClickHandlerToClass('help-button', helpButtonClickHandler)
    addClickHandlerToClass('plus-button', plusButtonClickHandler)
    addClickHandlerToClass('minus-button', minusButtonClickHandler)
}

addAllHandlers()
