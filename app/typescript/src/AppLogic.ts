import {$, addClickHandler} from './Helper'
import {registerWebSocketHandlers} from "./Websocket";
import * as styles from '../../styles/App.css';

const constructPseudoNameRow = (plusHidden: boolean): HTMLElement => {
    const plusButton = document.createElement('button');
    plusButton.textContent = 'Plus';
    plusButton.classList.add(styles.plusButton);
    if (plusHidden) {
        plusButton.classList.add(styles.hidden)
    }
    addClickHandler(plusButton, plusButtonClickHandler);

    const minusButton = document.createElement('button');
    minusButton.textContent = 'Minus';
    minusButton.classList.add(styles.minusButton);
    addClickHandler(minusButton, minusButtonClickHandler);

    const input = document.createElement('input');
    const inputType = document.createAttribute('type');
    inputType.value = 'text';
    input.attributes.setNamedItem(inputType);

    const nameRow = document.createElement('div');
    nameRow.classList.add(styles.pseudoNameRow);
    nameRow.appendChild(input);
    nameRow.appendChild(plusButton);
    nameRow.appendChild(minusButton);

    return nameRow
};

export const helpButtonClickHandler = () => {
    window.location.href = window.location.origin + '/help';
};

export const playButtonClickHandler = async () => {
    window.location.href = window.location.origin + '/game';
};

export const plusButtonClickHandler = async (ev: MouseEvent) => {
    if (ev.srcElement && ev.srcElement.parentElement) {
        const parentElem = ev.srcElement.parentElement;

        parentElem.classList.remove(styles.pseudoNameRow);
        parentElem.classList.add(styles.nameRow);

        // FIXME test if elements not null instead of using '!'
        // check if current input has a value
        const inputElem = parentElem.getElementsByTagName('input').item(0); // there should only ever exist one child input
        if (inputElem.value.length === 0) {
            inputElem.value = 'Default' //FIXME get next default player name from controller -> Rest-API map url to controller method
        }
        const playerCount = parentElem.parentElement!.childElementCount.valueOf();
        const maxPlayer = 4; //FIXME get from controller -> Rest-API map url to controller method
        parentElem.parentElement!.appendChild(constructPseudoNameRow(playerCount === maxPlayer - 1));

        window.location.href = window.location.origin + '/rest/v1/addPlayer/' + inputElem.value;
        //await fetch('rest/v1/addPlayer/' + inputElem.value); // FIXME doesn't work: use this instead of line above
    } else {
        //FIXME logging
    }
};

export const minusButtonClickHandler = async (ev: MouseEvent) => {
    if (ev.srcElement && ev.srcElement.parentElement) {
        const parentElem = ev.srcElement.parentElement;
        const inputElem = parentElem.getElementsByTagName('input').item(0);
        const playerName = inputElem.value;

        const children = parentElem.parentElement!.children;
        $(styles.plusButton, children.item(children.length - 1)).item(0);
        const plusButtonLastChild = $(styles.plusButton, children.item(children.length - 1)).item(0); // there should only ever exist one plus button
        plusButtonLastChild.classList.remove(styles.hidden);

        // FIXME test if elements not null instead of using '!'
        parentElem.parentElement!.removeChild(parentElem);

        window.location.href = window.location.origin + '/rest/v1/removePlayer/' + playerName;
        //await fetch('/rest/v1/removePlayer/' + playerName); // FIXME doesn't work: use this instead of line above
    } else {
        //FIXME logging
    }
};

registerWebSocketHandlers("ws://" + window.location.host + "/websocket");
