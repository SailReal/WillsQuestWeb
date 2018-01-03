import {registerWebSocketHandlers} from "./Websocket";

export const skipButtonClickHandler = () => {
    window.location.href = window.location.origin + '/game';
};

export const answerButtonClickHandler = (ev: MouseEvent) => {
    if (ev.srcElement) {
        const elem = ev.srcElement;
        if (elem instanceof HTMLButtonElement) {
            window.location.href = window.location.origin + '/rest/v1/solve/' + elem.innerText;
            //await fetch('/rest/v1/solve/' + elem.innerText); // FIXME doesn't work: use this instead of line above
        }
    }
};

registerWebSocketHandlers("ws://" + window.location.host + "/websocket"); // FIXME create no new socket, use it in separate script