import {registerWebSocketHandlers} from "./Websocket";

export const skipButtonClickHandler = () => {
    window.location.href = window.location.origin + '/game';
};


export const answerButton1ClickHandler = (ev: MouseEvent) => {
  handelAnswerButtonClickEvent(ev, 1)
};

export const answerButton2ClickHandler = (ev: MouseEvent) => {
    handelAnswerButtonClickEvent(ev, 2)
};

export const answerButton3ClickHandler = (ev: MouseEvent) => {
    handelAnswerButtonClickEvent(ev, 3)
};

export const answerButton4ClickHandler = (ev: MouseEvent) => {
    handelAnswerButtonClickEvent(ev, 4)
};

export const handelAnswerButtonClickEvent = (ev: MouseEvent, number: number) => {
    if (ev.srcElement) {
        const elem = ev.srcElement;
        if (elem instanceof HTMLButtonElement) {
            window.location.href = window.location.origin + '/rest/v1/answerChosen/' + number;
            //await fetch('/rest/v1/answerChosen/' + number); // FIXME doesn't work: use this instead of line above
        }
    }
};

registerWebSocketHandlers("ws://" + window.location.host + "/websocket"); // FIXME create no new socket, use it in separate script