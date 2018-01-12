import {doFetch} from "./Helper";

export const answerButton1ClickHandler = (ev: MouseEvent) => {
  handleAnswerButtonClickEvent(ev, 1)
};

export const answerButton2ClickHandler = (ev: MouseEvent) => {
    handleAnswerButtonClickEvent(ev, 2)
};

export const answerButton3ClickHandler = (ev: MouseEvent) => {
    handleAnswerButtonClickEvent(ev, 3)
};

export const answerButton4ClickHandler = (ev: MouseEvent) => {
    handleAnswerButtonClickEvent(ev, 4)
};

export const handleAnswerButtonClickEvent = (ev: MouseEvent, number: number) => {
    const elem = ev.target;
    if (elem instanceof HTMLButtonElement) {
        doFetch(window.location.origin + '/rest/v1/onAnswerChosen/' + number, "post");
    }
};
