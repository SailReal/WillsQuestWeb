import Vue from 'vue';
import Component from 'vue-class-component'
import * as styles from "../../styles/Result.css";
import {restartButtonClickHandler} from "../src/ResultLogic";
import Card from "./Card";

@Component({
    components: {
        Card
    },
    props: [
        'players'
    ],
    methods: {
        restartButtonClickHandler: restartButtonClickHandler
    },
    template:
        `<Card>
            <h1 class="${styles.title}">Result</h1>
            <div class="${styles.playerContainer}" v-for="player of players">
                <div class="${styles.playerName}">{{player.name}}</div>
                <div class="${styles.playerPoints}">Points: {{player.points}}</div>
                <div class="${styles.answerContainer}" v-if="player.correctAnswers.length > 0">
                    <div class="${styles.answerTitle} ${styles.correctTitle}">Correct answers</div>
                    <div class="${styles.answer}" v-for="(question, index) in player.correctAnswers">
                        {{index + 1}}. {{question.text}} (+{{question.points}} points)
                    </div>
                </div>
                <div class="${styles.answerContainer}" v-if="player.wrongAnswers.length > 0">
                    <div class="${styles.answerTitle} ${styles.wrongTitle}">Wrong answers</div>
                    <div class="${styles.answer}" v-for="(question, index) in player.wrongAnswers">
                        {{index + 1}}. {{question.text}} (Correct answer: {{question.answers[question.correctAnswer-1].text}})
                    </div>
                </div>
            </div>
            <div class="${styles.footer}">
                <button v-on:click="restartButtonClickHandler" class="btn ${styles.restartButton}">Restart</button>
            </div>
        </Card>`
})
export default class Result extends Vue {
}
