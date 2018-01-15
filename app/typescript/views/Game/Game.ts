import Vue from 'vue';
import Component from 'vue-class-component'
import * as styles from "../../../styles/Game.css";
import {
    addAnswerKeyLogger,
    removeAnswerKeyLogger
} from "../../src/GameLogic";
import Card from "../Card";
import AnswerButton from "./AnswerButton";

@Component({
    components: {
        Card,
        AnswerButton
    },
    props: [
        'question',
        'answers',
        'time'
    ],
    template:
        `<Card>
            <div class="${styles.questionGrid}">
                <h1 class="${styles.title}">
                    {{question}}
                </h1>
                <AnswerButton v-for="(answer, index) in answers"
                                :answer="answer.text"
                                :index="index + 1"
                                :key="index"
                >
                </AnswerButton>
            </div>
            <div class="${styles.footer}">
                <div class="${styles.time}">
                   <img src=/assets/images/ic_timer_48px.svg> {{time}} s
                </div>
            </div>
       </Card>`
})
export default class Game extends Vue {
    beforeMount() {
        addAnswerKeyLogger();
    };
    beforeDestroy() {
        removeAnswerKeyLogger();
    };
}
