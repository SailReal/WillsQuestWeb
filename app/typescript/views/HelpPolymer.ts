import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import * as styles from "../../styles/Help.css";

export class HelpPolymer extends GestureEventListeners(PolymerElement) {
    static get template() {
        return `<div class="${styles.contentGrid}">
                    <div class="${styles.card}">
                        <div class="${styles.text}">
                            {{text}}
                        </div>
                        <div class="${styles.footer}">
                            <button on-tap="backButtonClickHandler" class="${styles.backButton}">Back</button>
                        </div>
                    </div>
                </div>`;
    }

    constructor() {
        super();
    }

    backButtonClickHandler = () => {
        window.history.back();
    };

    static get is() {
        return 'help-polymer';
    };

    static get properties() {
        return {
            text: {
                type: String,
            }
        }
    };
}
