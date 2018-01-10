import Vue from 'vue';
import Component from 'vue-class-component'
import MyFooter from "./MyFooter"; // FIXME remove after we have a real component for composition
import * as styles  from "../../styles/App.css";
import {helpButtonClickHandler, playButtonClickHandler, minusButtonClickHandler, plusButtonClickHandler} from "../src/AppLogic";

// FIXME split this App component into a few smaller ones, the card-div and player inputs are good candidates

@Component({
    components: {
        MyFooter
    },
    props: [
        'username',
        'players',
        'showMinus',
        'showNewPlayerInput'
    ],
    methods: {
        plusButtonClickHandler: plusButtonClickHandler,
        minusButtonClickHandler: minusButtonClickHandler,
        helpButtonClickHandler: helpButtonClickHandler,
        playButtonClickHandler: playButtonClickHandler
    },
    template:
        `<div class="${styles.contentGrid}">
            <div class="${styles.card}">
                <h1 class="${styles.title}">
                    {{title}}
                </h1>
                <button v-on:click="playClicked" class="${styles.playButton}">Play</button>
                <div class="${styles.namesContainer}">
                    <div v-for="player of players" class="${styles.nameRow}">
                        <input type="text" :value="player.name" readonly/>
                        <button v-if="showMinus" v-on:click="minusButtonClickHandler" class="${styles.minusButton}">Minus</button>
                    </div>
                    <div v-if="showNewPlayerInput" class="${styles.nameRow}">
                        <input type="text" placeholder="" />
                        <button v-on:click="plusButtonClickHandler" class="${styles.plusButton}">Plus</button>
                    </div>
                </div>
                <div class="${styles.indexFooter}">
                    <div class="${styles.loginInfo}">
                        Logged in as: {{username}} (<a class="${styles.inlineLink}" :href="logOutUrl">logout</a>)
                    </div>
                    <button v-on:click="helpButtonClickHandler" class="${styles.helpButton}">Help</button>
                </div>
            </div>
        </div>`
})
export default class App extends Vue {
    playClicked = () => {
        playButtonClickHandler();
    };

    get title(): string {
        return 'Learn Duel';
    }

    get logOutUrl(): string {
        return window.location.origin + '/signOut';
    }
}
