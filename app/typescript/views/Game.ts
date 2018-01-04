import Vue from 'vue';
import Component from 'vue-class-component'
import MyFooter from "./MyFooter"; // FIXME remove after we have a real component for composition
import * as styles from "../../styles/Game.css";
import {
    answerButton1ClickHandler, answerButton2ClickHandler, answerButton3ClickHandler, answerButton4ClickHandler,
    skipButtonClickHandler
} from "../src/GameLogic";

// FIXME maybe split this App component into a few smaller ones, the card-div would be a good candidate for this

@Component({
    components: {
        MyFooter
    },
    methods: {
        answerButton1ClickHandler: answerButton1ClickHandler,
        answerButton2ClickHandler: answerButton2ClickHandler,
        answerButton3ClickHandler: answerButton3ClickHandler,
        answerButton4ClickHandler: answerButton4ClickHandler,
        skipButtonClickHandler: skipButtonClickHandler
    },
    template:
        `<div class="${styles.cardGrid}">
            <div class="${styles.card}">
                <div class="${styles.questionGrid}">
                    <h1 class="${styles.title}">
                        {{title}}
                    </h1>
                    <button v-on:click="answerButton1ClickHandler" class="${styles.answer1}">
                        Bla bla answer 1
                    </button>
                    
                    <button v-on:click="answerButton2ClickHandler" class="${styles.answer2}">
                        Bla bla answer 2
                    </button>
                    
                    <button v-on:click="answerButton3ClickHandler" class="${styles.answer3}">
                        Bla bla answer 3
                    </button>
                    
                    <button v-on:click="answerButton4ClickHandler" class="${styles.answer4}">
                        Bla bla answer 4
                    </button>
                </div>
                    <div class="${styles.footer}">
                        <div class="${styles.round}">
                           {{round}}
                        </div>
                        <div class="${styles.time}">
                           <img src=/assets/images/ic_timer_48px.svg> {{time}}
                        </div>
                        <button v-on:click="skipButtonClickHandler" class="${styles.skipButton}">Skip</button>
                    </div>
            </div>    
        </div>`
})
export default class Game extends Vue {
    get title(): string {
        return 'This is a simple question'; // FIXME: get question title from controller
    }

    get round(): string {
        // FIXME: make ajax call to retrieve round state
        return 'Round n:m'
    }

    get time(): string {
        // FIXME: make ajax call to retrieve time for question
        return 'x:y'
    }
}
