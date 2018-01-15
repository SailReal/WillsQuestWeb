import Vue from 'vue';
import Component from 'vue-class-component'
import * as styles  from "../../styles/Card.css";

@Component({
    template:
        `<div class="${styles.contentGrid}">
            <div class="${styles.card}">
                <slot></slot>
            </div>
        </div>`
})
export default class Card extends Vue {
}
