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
        'help'
    ],
    methods: {
        backButtonClickHandler: backButtonClickHandler
    },
    template:
        `<Card>
            <h1>Learn Duel Help</h1>
            <div class="${styles.helpContainer}">
                <div v-for="(line, index) in help" v-if="!line.startsWith('*')" class="${styles.text}">
                    {{line.replace("*", "•")}}
                </div>
                <div v-for="(line, index) in help" v-if="line.startsWith('*')" class="${styles.bulletPoint}">
                    {{line.replace("*", "•")}}
                </div>
            </div>
            <div class="${styles.footer}">
                <button v-on:click="backButtonClickHandler" class="btn ${styles.backButton}">Back</button>
            </div>
        </Card>`
})
export default class App extends Vue {
}
