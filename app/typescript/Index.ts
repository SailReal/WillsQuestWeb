import {getElemByClassName} from './Helper'

const addButtonClickHandler = () => {
    const elems = getElemByClassName('help-button')
    for (let i = 0; i < elems.length; ++i) {
        elems.item(i).addEventListener('click', () => {
            alert('test')
        })
    }
}

addButtonClickHandler()
