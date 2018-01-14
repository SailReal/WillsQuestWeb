import Vue from 'vue';
import Component from 'vue-class-component'
import * as styles from "../../styles/Game.css";
import {
    addAnswerKeyLogger,
    answerButton1ClickHandler, answerButton2ClickHandler, answerButton3ClickHandler, answerButton4ClickHandler,
    removeAnswerKeyLogger
} from "../src/GameLogic";

// FIXME #11 maybe split this Game component into a few smaller ones, the card-div would be a good candidate for this

@Component({
    props: [
        'question',
        'answers',
        'time'
    ],
    methods: {
        answerButton1ClickHandler: answerButton1ClickHandler,
        answerButton2ClickHandler: answerButton2ClickHandler,
        answerButton3ClickHandler: answerButton3ClickHandler,
        answerButton4ClickHandler: answerButton4ClickHandler,
    },
    template:
        `<div class="${styles.cardGrid}">
            <div class="${styles.card}">
                <div class="${styles.questionGrid}">
                    <h1 class="${styles.title}">
                        {{question}}
                    </h1>
                    <!-- FIXME find out how to access index of answers in vue so we can add these questions in a for loop -->
                    <button v-on:click="answerButton1ClickHandler" class="${styles.answer1}">
                        {{answers[0].text}}
                    </button>
                    
                    <button v-on:click="answerButton2ClickHandler" class="${styles.answer2}">
                        {{answers[1].text}}
                    </button>
                    
                    <button v-on:click="answerButton3ClickHandler" class="${styles.answer3}">
                        {{answers[2].text}}
                    </button>
                    
                    <button v-on:click="answerButton4ClickHandler" class="${styles.answer4}">
                        {{answers[3].text}}
                    </button>
                </div>
                    <div class="${styles.footer}">
                        <div class="${styles.time}">
                           <img src=/assets/images/ic_timer_48px.svg> {{time}} s
                        </div>
                    </div>
            </div>    
        </div>`
})
export default class Game extends Vue {
    beforeMount() {
        addAnswerKeyLogger();
    };
    beforeDestroy() {
        removeAnswerKeyLogger();
    };
}
