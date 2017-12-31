import Vue from 'vue';
import Component from 'vue-class-component'
import MyFooter from "./MyFooter"; // FIXME remove after we have a real component for composition
import * as styles  from "../../styles/App.css";
import {helpButtonClickHandler, playButtonClickHandler, minusButtonClickHandler, plusButtonClickHandler} from "../src/AppLogic";

// FIXME maybe split this App component into a few smaller ones, the card-div would be a good candidate for this

@Component({
    components: {
        MyFooter
    },
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
                <button v-on:click="playButtonClickHandler" class="${styles.playButton}">Play</button>
                <div class="${styles.namesContainer}">
                    <div class="${styles.nameRow}">
                        <input type="text" :placeholder="defaultPlayerName" />
                        <button v-on:click="plusButtonClickHandler" class="${styles.plusButton}">Plus</button>
                        <button v-on:click="minusButtonClickHandler" class="${styles.minusButton}">Minus</button>
                    </div>
                    <div class="${styles.pseudoNameRow}">
                        <input type="text"/>
                        <button v-on:click="plusButtonClickHandler" class="${styles.plusButton}">Plus</button>
                        <button v-on:click="minusButtonClickHandler" class="${styles.minusButton}">Minus</button>
                    </div>
                </div>
                <div class="${styles.indexFooter}">
                    <div class="${styles.loginInfo}">
                        Logged in as: {{userName}} (<a class="${styles.inlineLink}" :href="logOutUrl">logout</a>)
                    </div>
                    <button v-on:click="helpButtonClickHandler" class="${styles.helpButton}">Help</button>
                </div>
            </div>
        </div>`
})
export default class App extends Vue {
    get title(): string {
        return 'Learn Duel';
    }

    get userName(): string {
        // FIXME: make ajax call to retrieve logged in user name
        return 'Static user'
    }

    get defaultPlayerName(): string {
        // FIXME get placeholder from controller
        return 'Default'
    }

    get logOutUrl(): string {
        return window.location.origin + '/signOut';
    }
}
