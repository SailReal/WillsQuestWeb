import Vue from 'vue';
import Component from 'vue-class-component'
import * as styles  from "../../styles/Card.css";

@Component({
    props: [
        'content'
    ],
    template:
        `<div class="${styles.contentGrid}">
            <div class="${styles.card}"></div>
        </div>`
})
export default class Card extends Vue {
}