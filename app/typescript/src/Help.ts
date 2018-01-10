import {addClickHandlerToClass, replaceVueWithDiv,} from './Helper'

const backButtonClickHandler = () => {
    window.history.back();
};

const addAllHandlers = () => {
    addClickHandlerToClass('back-button', backButtonClickHandler);
};

export const injectHelp = (id: string, text: string) => {
    // FIXME create vue component instead?

    replaceVueWithDiv();
    const helpDiv = document.getElementById(id);

    if (helpDiv) {
        const textDiv = document.createElement("div");
        textDiv.innerText = text;
        helpDiv.appendChild(textDiv);

        const backButton = document.createElement("button");
        backButton.innerText = "Back";
        backButton.classList.add("back-button");
        helpDiv.appendChild(backButton);
    }

    addAllHandlers();
};


