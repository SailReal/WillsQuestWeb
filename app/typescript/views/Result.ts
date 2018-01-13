import Vue from 'vue';
import Component from 'vue-class-component'
import MyFooter from "./MyFooter"; // FIXME #11 remove after we have a real component for composition
import * as styles from "../../styles/Result.css";
import {restartButtonClickHandler} from "../src/ResultLogic";
import Card from "./Card";

// FIXME #11 split this App component into a few smaller ones, the card-div and player inputs are good candidates

@Component({
    components: {
        MyFooter,
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
            <div class="${styles.text}">
                <div v-for="player of players">
                    Player: {{player.name}}
                    Points: {{player.points}}
                    <div v-if="player.correctAnswers.length">
                        Correct answers:
                        <div v-for="correctAnswer of player.correctAnswers">
                            {{correctAnswer.text}}
                        </div>
                    </div>
                    <div v-if="player.wrongAnswers.length">
                        Wrong answers:
                        <div v-for="wrongAnswer of player.wrongAnswers">
                            {{wrongAnswer.text}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="${styles.footer}">
                <button v-on:click="restartButtonClickHandler" class="${styles.restartButton}">Restart</button>
            </div>>
        </Card>`
})
export default class App extends Vue {
}
