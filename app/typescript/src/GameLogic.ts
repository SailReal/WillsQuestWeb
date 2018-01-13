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
        onAnswerChosen(number)
    }
};

const onAnswerChosen = (number: number) => {
    doFetch(window.location.origin + '/rest/v1/onAnswerChosen/' + number, "post");
};

export const addAnswerKeyLogger = () => {
    removeAnswerKeyLogger();
    window.addEventListener("keydown", answerKeylistener, true);
};


export const removeAnswerKeyLogger  = () => {
    window.removeEventListener("keydown", answerKeylistener, true);
};

function answerKeylistener(event: KeyboardEvent) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    const input = Number(event.key);
    if (input > 0 && input < 9) {
        onAnswerChosen(input);
    } else {
        return;
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}
