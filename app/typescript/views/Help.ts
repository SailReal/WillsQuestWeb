import Vue from 'vue';
import Component from 'vue-class-component'
import * as styles from "../../styles/Help.css";
import {backButtonClickHandler} from "../src/HelpLogic";
import Card from "./Card";

// FIXME #8 get title of help and show as title

@Component({
    components: {
        Card
    },
    props: [
        'text'
    ],
    methods: {
        backButtonClickHandler: backButtonClickHandler
    },
    template:
        `<Card>
            <div>
                {{text}}
            </div>
            <div class="${styles.footer}">
                <button v-on:click="backButtonClickHandler" class="btn ${styles.backButton}">Back</button>
            </div>
        </Card>`
})
export default class App extends Vue {
}
