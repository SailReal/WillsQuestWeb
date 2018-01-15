import Vue from 'vue';
import Component from 'vue-class-component'
import {handleAnswerButtonClickEvent} from "../../src/GameLogic";
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
        `<button v-on:click="(ev) => handleAnswerButtonClickEvent(ev, index)" class="btn">
            {{answer}}
        </button>`
})
export default class AnswerButton extends Vue {
}
