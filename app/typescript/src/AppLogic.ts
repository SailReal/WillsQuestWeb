import {doFetch} from './Helper';

export const helpButtonClickHandler = () => {
    doFetch(window.location.origin + '/rest/v1/onHelp', "get")
};

export const playButtonClickHandler = () => {
    doFetch(window.location.origin + '/rest/v1/onStartGame', "get");
};

export const plusButtonClickHandler = async (ev: MouseEvent) => {
    if (ev.target instanceof HTMLButtonElement && ev.target.parentElement) {
        const inputElem = ev.target.parentElement
            .getElementsByTagName('input').item(0); // there should only ever exist one child input

        try {
            await doFetch(window.location.origin + '/rest/v1/onAddPlayer/' + inputElem.value, "post");
        } catch(e) {
            alert(e);
        }
    } else {
        //FIXME logging (maybe with sentry.io?)
    }
};

export const minusButtonClickHandler = (ev: MouseEvent) => {
    if (ev.target instanceof HTMLButtonElement && ev.target.parentElement) {
        const inputElem =  ev.target.parentElement
            .getElementsByTagName('input').item(0);


        doFetch(window.location.origin + '/rest/v1/onRemovePlayer/' + inputElem.value, "post");
    } else {
        //FIXME logging (maybe with sentry.io?)
    }
};

