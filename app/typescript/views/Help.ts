import Vue from 'vue';
import Component from 'vue-class-component'
import MyFooter from "./MyFooter"; // FIXME #11 remove after we have a real component for composition
import * as styles from "../../styles/Help.css";
import {backButtonClickHandler} from "../src/HelpLogic";

// FIXME #11 split this App component into a few smaller ones, the card-div and player inputs are good candidates
// FIXME #8 get title of help and show as title

@Component({
    components: {
        MyFooter
    },
    props: [
        'text'
    ],
    methods: {
        backButtonClickHandler: backButtonClickHandler
    },
    template:
        `<div class="${styles.contentGrid}">
            <div class="${styles.card}">
                <div class="${styles.text}">
                    {{text}}
                </div>
                <div class="${styles.footer}">
                    <button v-on:click="backButtonClickHandler" class="${styles.backButton}">Back</button>
                </div>
            </div>
        </div>`
})
export default class App extends Vue {
}
