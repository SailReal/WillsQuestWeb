import Vue from 'vue';
import Component from 'vue-class-component'
import {handleAnswerButtonClickEvent} from "../../src/GameLogic";
import * as styles from "../../../styles/Game.css";
import Card from "../Card";

@Component({
    components: {
        Card
    },
    props: [
        'answer',
        'index'
    ],
    methods: {
        handleAnswerButtonClickEvent: handleAnswerButtonClickEvent
    },
    template:
        `<button v-on:click="(ev) => handleAnswerButtonClickEvent(ev, index)" class="btn ${styles.answerButton}">
            {{answer}}
        </button>`
})
export default class AnswerButton extends Vue {
}
