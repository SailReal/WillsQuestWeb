import {doFetch} from "./Helper";

export const restartButtonClickHandler = () => {
    doFetch(window.location.origin + '/rest/v1/onReset', 'GET');
};
