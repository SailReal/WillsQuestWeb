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
            <div>
                <div v-for="player of players">
                    <p>Player: {{player.name}}</p>
                    <p>Points: {{player.points}}</p>
                    <div v-if="player.correctAnswers.length > 0">
                        <p>Correct answers:</p>
                        <p v-for="question of player.correctAnswers">
                            {{question.text}}
                        </p>
                    </div>
                    <div v-if="player.wrongAnswers.length > 0">
                        <p>Wrong answers:</p>
                        <div v-for="question of player.wrongAnswers">
                            {{question.text}} (Correct answer: {{question.answers[question.correctAnswer-1].text}})
                        </div>
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
