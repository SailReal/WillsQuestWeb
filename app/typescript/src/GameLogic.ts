import {doFetch} from "./Helper";

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
            doFetch(window.location.origin + '/rest/v1/onAnswerChosen/' + number, "post");
        }
    }
};
